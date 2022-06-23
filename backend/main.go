package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var frontendUrl = "http://127.0.0.1:3000"
var db *gorm.DB

func main() {
	db = InitDB()

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{frontendUrl},
	}))

	r.GET("/ping", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "pong")
	})

	r.GET("/messages/:id", func(ctx *gin.Context) {
		var rec Logs
		var recs []Logs
		id := ctx.Params.ByName("id")
		db.First(&rec, id)

		if (Logs{}) == rec {
			ctx.JSON(http.StatusNotFound, gin.H{})
			return
		}
		db.Where("network = ? AND logs.window = ? AND created_at BETWEEN ? and ?",
			rec.Network,
			rec.Window,
			rec.Created_At.AddDate(0, 0, -1),
			rec.Created_At.AddDate(0, 0, +1)).
			Limit(100).
			Find(&recs)
		ctx.JSON(http.StatusOK, recs)
	})
	r.GET("/message/:msgid", handleGetMessage)
	r.GET("/links", handleSearchLinks)
	r.Run(":8080")
}

func handleGetMessage(ctx *gin.Context) {
	id := ctx.Params.ByName("id")
	var rec Logs
	db.First(&rec, id)
	if (Logs{}) == rec {
		ctx.JSON(http.StatusNotFound, gin.H{})
		return
	}
	ctx.JSON(http.StatusOK, rec)
}

func handleSearchLinks(ctx *gin.Context) {
	var links []Link
	query := ctx.Request.URL.Query().Get("q")
	if query == "" {
		db.Order("msg_id desc").
			Scopes(Paginate(ctx.Request)).
			Find(&links)
		ctx.JSON(http.StatusOK, links)
	} else {
		db.Where("link ILIKE ?", "%"+query+"%").
			Order("msg_id desc").
			Scopes(Paginate(ctx.Request)).
			Find(&links)
		ctx.JSON(http.StatusOK, links)
	}
}

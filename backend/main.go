package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var frontendUrl = "http://127.0.0.1:3000"

func uniq(links []Link) (result []Link) {
	flagLinks := make(map[string]bool)
	for _, link := range links {
		if _, ok := flagLinks[link.Link]; !ok {
			flagLinks[link.Link] = true
			result = append(result, link)
		}
	}
	return result
}

func main() {
	r := gin.Default()
	db := InitDB()

	r.GET("/ping", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "pong")
	})

	r.GET("/message/:msgid", func(ctx *gin.Context) {
		var rec Logs
		ctx.Header("Access-Control-Allow-Origin", frontendUrl)
		id := ctx.Params.ByName("id")
		db.First(&rec, id)
		if (Logs{}) == rec {
			ctx.JSON(http.StatusNotFound, gin.H{})
			return
		}
		ctx.JSON(http.StatusOK, rec)
	})

	r.GET("/messages/:id", func(ctx *gin.Context) {
		var rec Logs
		var recs []Logs
		ctx.Header("Access-Control-Allow-Origin", frontendUrl)
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

	r.GET("/links", func(ctx *gin.Context) {
		var links []Link
		ctx.Header("Access-Control-Allow-Origin", frontendUrl)
		db.Order("msg_id desc").
			Scopes(Paginate(ctx.Request)).
			Find(&links)
		ctx.JSON(http.StatusOK, uniq(links))
	})

	r.Run(":8080")
}

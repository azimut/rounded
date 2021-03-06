package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

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
	r.GET("/channels", handleListChannels)
	r.GET("/channel/:chanid", handleSearchChannel)
	r.GET("/message/:msgid", handleGetMessage)
	r.GET("/links", handleSearchLinks)
	r.Run(":8080")
}

func handleListChannels(ctx *gin.Context) {
	var results []string
	db.Table("current_channels").Pluck("channel", &results)
	ctx.JSON(http.StatusOK, map[string]interface{}{"channels": results})
}

func handleSearchChannel(ctx *gin.Context) {
	var rawlogs []Logs
	var logs []LogsWithUser
	channel := ctx.Params.ByName("chanid")
	if channel == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{})
		return
	}
	channel = "#" + channel
	query := ctx.Request.URL.Query().Get("q")
	if query == "" {
		db.Where("logs.window = ?", channel).
			Order("id desc").
			Scopes(Paginate(ctx.Request)).
			Find(&rawlogs)
	} else {
		db.Where("logs.window = ? AND message ILIKE ?", channel, "%"+query+"%").
			Order("id desc").
			Scopes(Paginate(ctx.Request)).
			Find(&rawlogs)
	}
	logs, err := processLogs(rawlogs)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	ctx.JSON(http.StatusOK, logs)
}

func handleGetMessage(ctx *gin.Context) {
	msgid := ctx.Params.ByName("msgid")
	var rawlog Logs
	var log LogsWithUser
	db.First(&rawlog, msgid)
	if (Logs{}) == rawlog {
		ctx.JSON(http.StatusNotFound, gin.H{})
		return
	}
	log, err := processLog(rawlog)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	ctx.JSON(http.StatusOK, log)
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

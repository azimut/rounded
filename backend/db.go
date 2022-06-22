package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dsn = "host=127.0.0.1 user=rounded password=redondo dbname=irclogs port=5432 sslmode=disable TimeZone=America/Argentina/Buenos_Aires"

type Logs struct {
	ID         uint `gorm:"primaryKey"`
	Created_At time.Time
	Window     string
	Network    string
	Message    string
}

type Links struct {
	MsgId uint `gorm:"primaryKey"`
	Link  string
}

func InitDB() *gorm.DB {
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true,
	}), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect to db")
	}
	return db
}

func Paginate(r *http.Request) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		q := r.URL.Query()
		page, _ := strconv.Atoi(q.Get("page"))
		if page == 0 {
			page = 1
		}

		pageSize, _ := strconv.Atoi(q.Get("page_size"))
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 10
		}

		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}

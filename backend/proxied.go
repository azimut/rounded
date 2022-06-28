package main

import (
	"fmt"
	"strings"
)

type LogsWithUser struct {
	ID         uint
	Created_At string
	Channel    string
	Message    string
	User       string
}

func isBot(user string) bool {
	for _, bot := range BOTS {
		if user == bot {
			return true
		}
	}
	return false
}

func extractNickMsg(rawmessage string) (string, string, error) {
	splitted := strings.SplitN(rawmessage, ">", 2)
	if len(splitted) < 2 {
		return "", "", fmt.Errorf("failed to split message in enough parts")
	}
	return strings.TrimSpace(splitted[0][1:]), strings.TrimSpace(splitted[1]), nil
}

func processLog(rawlog Logs) (newlog LogsWithUser, err error) {
	if strings.Contains(rawlog.Message, ">") {
		usr, msg, err := extractNickMsg(rawlog.Message)
		if err != nil {
			return newlog, err
		}
		if isBot(usr) {
			usr, msg, err = extractNickMsg(msg)
			if err != nil {
				return newlog, err
			}
		}
		newlog.User = usr
		newlog.Message = msg
	} else {
		newlog.User = ""
		newlog.Message = rawlog.Message
	}
	newlog.ID = rawlog.ID
	newlog.Created_At = rawlog.Created_At.Format("2006-01-02 15:04:05")
	newlog.Channel = rawlog.Window
	return newlog, nil
}

func processLogs(rawlogs []Logs) ([]LogsWithUser, error) {
	var logs []LogsWithUser
	for _, rawlog := range rawlogs {
		log, err := processLog(rawlog)
		if err != nil {
			return nil, err
		}
		logs = append(logs, log)
	}
	return logs, nil
}

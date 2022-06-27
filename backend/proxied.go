package main

import (
	"fmt"
	"strings"
)

var BOTS = []string{"nbot", "nbot_"}

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

func processLogs(rawlogs []Logs) ([]LogsWithUser, error) {
	logs := make([]LogsWithUser, len(rawlogs))
	for i, rawlog := range rawlogs {
		if strings.Contains(rawlog.Message, ">") {
			usr, msg, err := extractNickMsg(rawlog.Message)
			if err != nil {
				return nil, err
			}
			if isBot(usr) {
				usr, msg, err = extractNickMsg(msg)
				if err != nil {
					return nil, err
				}
			}
			logs[i].User = usr
			logs[i].Message = msg
		} else {
			logs[i].User = ""
			logs[i].Message = rawlog.Message
		}
		logs[i].ID = rawlog.ID
		logs[i].Created_At = rawlog.Created_At.Format("2006-01-02 15:04:05")
	}
	return logs, nil
}

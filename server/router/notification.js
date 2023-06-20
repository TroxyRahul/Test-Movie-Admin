const express = require("express");
const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();

const notificationRouter = express.Router();

notificationRouter.get("/", (req, res, next) => {
  try {
    console.log("-----notiRoutersse");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    eventEmitter.addListener("newMovie", (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    req.on("close", () => {
      eventEmitter.removeListener("newMovie", (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { notificationRouter, eventEmitter };

require("dotenv").config();
const express = require("express");
var socket = require("socket.io");

const bodyparser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./api");
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/", apiRouter());

server = app.listen(process.env.PORT);

io = socket(server);

io.on("connection", socket => {
  socket.on("SEND_MESSAGE", message => {
    const { user_id, to_user_id } = message;
    io.emit(`RECEIVE_MESSAGE${user_id}${to_user_id}`, message);
  });
  socket.on("TYPING", ({ userId, toUserId, isTyping }) => {
    io.emit(`TYPING${userId}${toUserId}`, isTyping);
  });
});

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
  console.log(socket.id);
  socket.on("SEND_MESSAGE", message => {
    io.emit("RECEIVE_MESSAGE", message)
  });
  socket.on("SEND_MESSAGE", message => {
    console.log(message)
  });
});

const express = require("express");

const apiRouter = require("./api");

const app = express();

// app.use(express.static("public"));
// app.use(express.static("assets"));

app.use("/api", apiRouter);

app.listen(process.env.PORT || 8080);

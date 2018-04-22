const express = require("express");
const router = express.Router();
const exjwt = require("express-jwt");

const users = require("./users");
const lessons = require("./lessons");
const imageUploder = require("./imageUploder");
const register = require("./register");

const jwtMW = exjwt({
  secret: "keyboard cat 4 ever"
});

const api = () => {
  const router = express.Router();
  router.post("/register", register);
  router.post("/lessons", lessons);
  router.post("/login", users.login);

  return router;
};

module.exports = api;

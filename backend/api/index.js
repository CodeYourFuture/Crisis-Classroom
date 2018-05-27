const express = require("express");
const router = express.Router();
const exjwt = require("express-jwt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./files",
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const logIn = require("./logIn");
const lessons = require("./lessons");
const checkUserName = require("./checkUserName");
const checkEmail = require("./checkEmail");
const register = require("./register");
const survey = require("./survey");
const files = require("./files");
const creatLessons = require("./creatLessons");
const EditLesson = require("./EditLesson");
const DeleteLesson = require("./DeleteLesson");

const jwtMW = exjwt({
  secret: "keyboard cat 4 ever"
});

const api = () => {
  const router = express.Router();
  router.post("/register", register);
  router.get("/lessons", lessons);
  router.post("/login", logIn.login);
  router.post("/check-email", checkEmail);
  router.post("/check-user-name", checkUserName);
  router.post("/survey", survey);
  router.post("/creat-lessons", creatLessons);
  router.post("/edit-lessons", EditLesson);
  router.post("/delete-lessons", DeleteLesson);
  router.post("/files", upload.single("file"), files);

  return router;
};

module.exports = api;

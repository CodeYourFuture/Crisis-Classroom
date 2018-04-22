const express = require("express");
const router = express.Router();

const users =require("./users")
const lessons = require("./lessons")
const imageUploder = require("./imageUploder")
const registert = require("./registert")
router.use("/", registert)
router.use("/", imageUploder)
router.use("/", lessons);
router.use("/", users);


module.exports = router;

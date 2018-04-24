const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyparser = require("body-parser");
const cors = require("cors");

const router = express.Router();
router.use(cors());
router.use(bodyparser.json());

router.post("/upload", (req, res) => {
  "./server/static/files", "http://localhost:8001/static/files";
  console.log(req.files);
});

module.exports = router;

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const router = express.Router();
router.use(cors());
router.use(bodyparser.json());

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

const jwtMW = exjwt({
  secret: "keyboard cat 4 ever"
});

router.post("/login", (req, res) => {
  var sql = `select * from users where userName=? and password=?`;
  console.log(req.body);
  db.all(sql, [req.body.userName, req.body.password], (err, rows) => {
    if (err) {
      return res.status(400).json({
        sucess: false,
        token: null,
        err: "Something bad happened"
      });
    }

    if (rows.length === 0) {
      return res.status(400).json({
        sucess: false,
        token: null,
        err: "username or password are wrong"
      });
    }

    let token = jwt.sign(
      { id: rows.id, userName: rows.userName },
      "keyboard cat 4 ever",
      { expiresIn: 129600 }
    );
    return res.json({
      sucess: true,
      err: null,
      token
    });
  });
});

router.get("/", jwtMW, (req, res) => {
  res.send("You are authenticated");
});

router.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  } else {
    next(err);
  }
});


// router.post('/login', function (req, res) {
//   var sql = `select * from users where userName=? and password=?`;
//   console.log(req.body)
//   db.all(sql, [req.body.userName, req.body.password], (err, rows) => {
//       if (err) {
//           res.status(500).end();
//         } else {
//           res.status(200).json({
//             status: rows.length === 1, rows
//           });
//         };
//   });
// });

module.exports = router;

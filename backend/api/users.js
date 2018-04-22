const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const login = (req, res) => {
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
};

// router.get("/", jwtMW, (req, res) => {
//   res.send("You are authenticated");
// });

// router.use(function(err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).send(err);
//   } else {
//     next(err);
//   }
// });

module.exports = {
  login: login
};

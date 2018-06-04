const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");



const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const login = (req, res) => {
  var sql = `select users.userName, users.password from users where userName=? and password=?`;
  db.all(sql, [req.body.userName, req.body.password], (err, rows) => {
    if (rows.length === 0) {
      return res.status(400).json({
        sucess: false,
        token: null,
        msg: "username or password are wrong"
      });
    }
    if (err) {
      return res.status(400).json({
        sucess: false,
        token: null,
        msg: "Ops! Sorry something happened on the server, please try again later." 
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

module.exports = {
  login: login
};
//use bcrypt to secure password
//https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

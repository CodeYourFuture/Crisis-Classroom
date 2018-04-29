const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const checkUsers = (req, res) => {
  var sql = "select  users.email, users.userName from users where  userName=? or email= ?";
  console.log(req.body);
  db.all(sql, [req.body.userName, req.body.email], (err, rows) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json({
        rows
      });
    }
  });
};
module.exports = checkUsers;

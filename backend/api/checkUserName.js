const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const checkUserName = (req, res) => {
  var sql = "select users.userName from users where  userName=?";
  db.all(sql, [req.body.userName], (err, rows) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json({
        rows
      });
    }
  });
};
module.exports = checkUserName;

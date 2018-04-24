const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const register = (req, res) => {
  var sql = `insert into users
             (firstName, surName, userName, email, password, confirmPassword)
             values (?, ?, ?, ?, ?, ?)`;
  console.log(req.body);
  db.run(
    sql,
    [
      req.body.firstName,
      req.body.surName,
      req.body.userName,
      req.body.email,
      req.body.password,
      req.body.confirmPassword
    ],
    (err, rows) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).json({
          users: rows
        });
      }
    }
  );
};
module.exports = register;
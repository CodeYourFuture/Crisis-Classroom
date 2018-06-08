const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const checkUserName = (req, res) => {
  var sql = 'select users.userName from users where  userName=?';
  db.all(sql, [req.body.userName], (err, rows) => {
    if (err) {
      return res.status(400).json({
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      });
    } else {
      res.status(200).json({
        rows,
      });
    }
  });
};
module.exports = checkUserName;

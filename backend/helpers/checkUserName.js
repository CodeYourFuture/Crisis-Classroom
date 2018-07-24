const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const checkuser_name = (req, res) => {
  var sql = 'select users.user_name from users where  user_name=?';
  db.all(sql, [req.body.user_name], (err, rows) => {
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
module.exports = checkuser_name;

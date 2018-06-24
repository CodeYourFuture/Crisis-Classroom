const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const CheckRegistrationToken = (req, res) => {
  const token = req.params.token;
  console.log(token)
  var sql =
    'select userName, resetPasswordToken, firstName, surName, email from users where resetPasswordToken=?';
  db.all(sql, [token], (err, rows) => {
    const [user] = rows;
    if (!user) {
      return res.status(400).json({ msg: 'Sorry this link is Wrong.' });
    } else if (err) {
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
module.exports = CheckRegistrationToken;

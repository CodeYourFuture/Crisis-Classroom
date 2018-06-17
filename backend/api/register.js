const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const register = (req, res) => {
  const {
    firstName,
    surName,
    userName,
    email,
    password,
    confirmPassword,
  } = req.body;
  if (password === confirmPassword) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({
          msg: `Ops! Sorry something happened on the server, please try again later.`,
        });
      } else {
        var sql = `insert into users
        (firstName, surName, userName, email, password)
        values (?, ?, ?, ?, ?)`;
        db.run(
          sql,
          [firstName, surName, userName, email, hash],
          (err, rows) => {
            if (err) {
              return res.status(400).json({
                msg: `Ops! Sorry something happened on the server, please try again later.`,
              });
            } else {
              res.status(200).json({
                users: rows,
              });
            }
          }
        );
      }
    });
  }
};
module.exports = register;

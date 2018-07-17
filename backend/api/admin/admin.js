const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const Admin = (req, res) => {
    const { userName } = req.body;
    getAdmin(userName)
    .then((admin) => {
        res.json(admin);
    })
    .catch((err) =>
        res.status(400).json({
          err,
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        })
      );
  };
  const getAdmin = (userName) => {
    return new Promise((resolve, reject) => {
      var sql = `select title, firstName, surName, email, userName, avatar, aboutUser, teacher, admin from users where userName=?`;
      db.all(sql, [userName], (err, admin) => {
        if (err) return reject(err);
        return resolve(admin);
      });
    });
  };
  
module.exports = Admin;

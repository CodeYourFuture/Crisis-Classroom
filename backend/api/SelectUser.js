const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const CheckAdmin = require('../helpers/checkAdmin');

const SelectUser = (req, res) => {
  const { userName, id } = req.body;
  CheckAdmin(userName)
    .then(()=>getUser(id))
    .then((data) => {
        res.json(data);
    })
    .catch((err) =>
    res.status(400).json({
        err,
        msg:
        'Ops! Sorry something happened on the server, please try again later.',
    })
);
};

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `select id, userName, surName, firstName, email, teacher, admin from users where id=?`;
        db.all(sql, [id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
module.exports = SelectUser;

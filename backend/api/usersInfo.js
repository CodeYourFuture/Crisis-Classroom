const sqlite3 = require ('sqlite3').verbose ();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database (filename);

const CheckAdmin = require ('../helpers/checkAdmin');

const UsersInfo = (req, res) => {
    const userName = req.body;
  CheckAdmin (userName)
    .then (getUsers)
    .then (users => {
      res.json (users);
    })
    .catch (err =>
      res.status (400).json ({
        err,
        msg: 'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const getUsers = () => {
  return new Promise ((resolve, reject) => {
    var sql = `select userName, surName, firstName, email, teacher, admin from users`;
    db.all (sql, [], (err, data) => {
      if (err) return reject (err);
      return resolve (data);
    });
  });
};
module.exports = UsersInfo;

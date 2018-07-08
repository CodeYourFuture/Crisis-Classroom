const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const checkAdmin = (data) => {
  const userName = data;
  return new Promise((resolve, reject) => {
    var sql = 'select admin from users where  userName=?';
    db.get(sql, [userName], (err, user) => {
      if (err) return reject(err);
      if (!user) return reject('User does not exist');
      if (user.admin === 1) {
        return resolve(user.admin);
      }
      return reject('You have to be an admin');
    });
  });
};
module.exports = checkAdmin;

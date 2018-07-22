const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

getSkills = (id) => {
  return new Promise((resolve, reject) => {
    var sql = `select * from skills where userId= ? or id=?`;
    db.all(sql, [id, id], (err, skills) => {
      if (err) return reject(err);
      return resolve(skills);
    });
  });
};
module.exports = getSkills;

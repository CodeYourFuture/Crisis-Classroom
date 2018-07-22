const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);
const getSkills = require('../../helpers/getSkills');

const UserProfile = (req, res) => {
  const { userName } = req.body;

  getUser(userName)
    .then((user) => getUserinfo(user))
    .then((userProfile) => res.json(userProfile))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};
const getUser = (userName) => {
  return new Promise((resolve, reject) => {
    var sql = `select id ,title, firstName, surName, email, userName, avatar, aboutUser from users where userName=?`;
    db.all(sql, [userName], (err, user) => {
      if (err) return reject(err);
      if (user) {
        return resolve(user);
      }
    });
  });
};
getUserinfo = (user) => {
  const userId = user[0].id;
  return Promise.all([getSkills(userId)]).then(([skills]) => {
    return {
      ...user,
      skills,
    };
  });
};

module.exports = UserProfile;

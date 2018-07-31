const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const getSkills = require("../../helpers/getSkills");
const getExperiences = require('../../helpers/getExperiences');

const UserProfile = (req, res) => {
  const { user_name } = req.body;

  getUser(user_name)
    .then(user => getUserinfo(user))
    .then(userProfile => res.json(userProfile))
    .catch(err =>
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      })
    );
};
const getUser = user_name => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Ops! Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(
            `select id ,title, first_name, sur_name, email, user_name, avatar, about_user, date from users where user_name=$1`,
            [user_name]
          )
          .then(result => {
            if (result) {
              const user = result.rows;
              return resolve(user);
            } else return reject(err);
          });
        done();
      }
    );
  });
};
getUserinfo = user => {
  const user_id = user[0].id;
  return Promise.all([getSkills(user_id), getExperiences(user_id)]).then(
    ([skills, experiences]) => {
      return {
        ...user,
        skills,
        experiences
      };
    }
  );
};

module.exports = UserProfile;

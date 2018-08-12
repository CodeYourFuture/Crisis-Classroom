const pg = require("pg");

const connectionString = process.env.DATABASE_URL;


const UserProfile = (req, res) => {
  const { id } = req.body;

  getUser(id)
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
const getUser = id => {
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
            `select id ,title, first_name, sur_name, email, user_name, avatar, about_user, date from users where id=$1`,
            [id]
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

getSkills = (id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`select * from skills where user_id=$1`, [id])
        .then((result) => {
          if (result) {
            const skills = result.rows;
            return resolve(skills);
          } else return reject();
        });
        done()
    });
  });
};
getExperiences = (id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`select * from experience where user_id=$1`, [id])
        .then((result) => {
          if (result) {
            const experiences = result.rows;
            return resolve(experiences);
          } else return reject();
        });
        done()
    });
  });
};

module.exports = UserProfile;

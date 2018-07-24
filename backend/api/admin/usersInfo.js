const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const CheckAdmin = require('../../helpers/checkAdmin');

const UsersInfo = (req, res) => {
  const { user_name } = req.body;
  CheckAdmin(user_name)
    .then(getUsers)
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

const getUsers = () => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client.query(`select id, title, user_name, sur_name, first_name, email, teacher, admin, avatar, about_user from users`).then((result) => {
        if (result) {
          const data = result.rows;
          return resolve(data);
        } else return reject(err);
      });
    });
  });
};
module.exports = UsersInfo;

const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const Admin = (req, res) => {
  const { user_name } = req.body;
  getAdmin(user_name)
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
const getAdmin = (user_name) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(
          `select title, first_name, sur_name, email, user_name, avatar, about_user, teacher, admin from users where user_name=$1`,
          [user_name]
        )
        .then((result) => {
          if (result) {
            const admin = result.rows;
            return resolve(admin);
          } else return reject();
        });
        done()
    });
  });
};

module.exports = Admin;

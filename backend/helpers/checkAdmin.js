const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const checkAdmin = (data) => {
  const user_name = data;
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`select admin from users where  user_name=$1`, [user_name])
        .then((result) => {
          if (result) {
            if (result.rowCount == 0) return reject('User does not exist');
            if (result.rows[0].admin) {
              return resolve(result.rows[0].admin);
            } else return reject('You have to be an admin');
          } else return reject();
        });
        done()
    });
  });
};
module.exports = checkAdmin;

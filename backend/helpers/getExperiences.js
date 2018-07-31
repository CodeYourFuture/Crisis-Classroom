const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

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
        .query(`select * from experience where user_id=$1 or id=$2`, [id, id])
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
module.exports = getExperiences;

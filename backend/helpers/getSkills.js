const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

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
        .query(`select * from skills where user_id=$1 or id=$2`, [id, id])
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
module.exports = getSkills;

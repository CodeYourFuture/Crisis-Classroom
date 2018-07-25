const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const checkuser_name = (req, res) => {
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      return res.status(400).json({
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      });
    }
    client
      .query(`select user_name from users where user_name=$1`, [
        req.body.user_name,
      ])
      .then((result) => {
        if (result) {
          console.log(result);
          const { rows } = result;
          res.status(200).json({ rows });
        }
      });
  });
};
module.exports = checkuser_name;

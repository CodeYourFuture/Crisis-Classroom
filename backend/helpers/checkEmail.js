const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const checkEmail = (req, res) => {
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      return res
        .status(400)
        .json({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
    }
    client
      .query(`select email from users where email=$1`, [req.body.email])
      .then((result) => {
        if (result) {
          const { rows } = result;
          res.status(200).json({ rows });
        }
      });
      done()
  });
};
module.exports = checkEmail;

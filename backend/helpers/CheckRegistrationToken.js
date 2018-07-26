const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const CheckRegistrationToken = (req, res) => {
  const token = req.params.token;
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      return res.status(400).json({
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      });
    }
    client
      .query(
        `select user_name, token, first_name, sur_name, email from users where token=$1`,
        [token]
      )
      .then((result) => {
        if (result) {
          if (result.rowCount == 0) {
            return res.status(400).json({ msg: 'Sorry this link is Wrong.' });
          } else {
            const rows = result.rows;
            res.status(200).json({
              rows,
            });
          }
        } else
          return res.status(400).json({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
      });
  });
};
module.exports = CheckRegistrationToken;

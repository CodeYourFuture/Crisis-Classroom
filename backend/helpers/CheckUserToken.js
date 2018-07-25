const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const CheckUserToken = (req, res) => {
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
        `select token, token_expires, user_name from users where token=$1`,
        [token]
      )
      .then((result) => {
        if (result) {
          const { rows } = result;
          if (result.rowCount == 0) {
            return res.status(400).json({ msg: 'Sorry this link is Wrong.' });
          } else if (err) {
            return res.status(400).json({
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
          } else if (Date.now() > rows[0].token_expires) {
            return res.status(400).json({ msg: 'Sorry this link is expired.' });
          } else {
            res.status(200).json({
              rows,
            });
          }
        }
      });
  });
};
module.exports = CheckUserToken;

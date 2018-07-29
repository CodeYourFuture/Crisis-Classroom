const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const DeleteSkill = (req, res) => {
  const { id } = req.body;
  delelet(id)
    .then(() => res.json({ msg: 'Success! Your skill has been deleted.' }))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const delelet = (id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client.query(`DELETE FROM skills where id=$1`, [id]).then((result) => {
        if (result.rowCount == 1) {
          return resolve();
        } else
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
      });
      done()
    });
  });
};

module.exports = DeleteSkill;

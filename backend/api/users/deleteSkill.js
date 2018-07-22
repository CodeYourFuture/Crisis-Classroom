const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

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
    var sql = `DELETE FROM skills where id=?`;
    db.run(sql, [id], (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

module.exports = DeleteSkill;

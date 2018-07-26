const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const editSkill = (req, res) => {
  const skill = req.body;
  setSkill(skill)
    .then(() => res.json({ msg: 'Success! Your skill has been changed.' }))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const setSkill = (skill) => {
  const { id, skill_name, about_skill, skill_level } = skill;
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
          `update skills set skill_name=$1, about_skill=$2, skill_level=$3 where id=$4`,
          [skill_name, about_skill, skill_level, id]
        )
        .then((result) => {
          if (result.rowCount == 1) {
            return resolve();
          } else
            return reject({
              err,
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
        });
    });
  });
};

module.exports = editSkill;

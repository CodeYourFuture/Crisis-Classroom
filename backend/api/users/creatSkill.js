const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const creatSkill = (req, res) => {
  const skill = req.body;
  saveSkill(skill)
    .then(() => res.json({ msg: 'Success! Your skill has been created.' }))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const saveSkill = (skill) => {
  const { skill_name, about_skill, skill_level, user_id } = skill;
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
          `insert into skills
      ( user_id, skill_name, about_skill, skill_level)
      values ($1, $2, $3, $4)`,
          [user_id, skill_name, about_skill, skill_level]
        )
        .then((result) => {
          if (result.rowCount == 1) {
            return resolve();
          } else
            return reject({
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
        });
    });
  });
};

module.exports = creatSkill;

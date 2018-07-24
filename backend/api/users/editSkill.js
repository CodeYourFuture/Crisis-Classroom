const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const editSkill = (req, res) => {
  const date = Date.now().toString();
  const skill = req.body;

  setSkill(skill)
    .then((data) => res.json({ msg: 'Success! Your skill has been changed.' }))
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
    var sql = `update skills set skill_name=?, about_skill=?, skill_level=? where id=?`;
    db.run(sql, [skill_name, about_skill, skill_level, id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = editSkill;

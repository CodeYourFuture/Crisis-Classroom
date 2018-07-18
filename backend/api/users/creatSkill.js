const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const creatSkill = (req, res) => {
  const date = Date.now().toString();
  const skill = req.body;

  saveSkill(skill).then((data) => res.json(data)).catch((err) =>
    res.status(400).json({
      err,
      msg:
        'Ops! Sorry something happened on the server, please try again later.',
    })
  );
};

const saveSkill = (skill) => {
  const { skillName, aboutSkill, skillLevel, userId } = skill;
  return new Promise((resolve, reject) => {
    var sql = `insert into skills
    ( userId, skillName, aboutSkill, skillLevel)
    values (?, ?, ?, ?)`;
    db.run(sql, [userId, skillName, aboutSkill, skillLevel], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = creatSkill;

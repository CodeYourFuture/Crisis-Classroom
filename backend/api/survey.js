const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const survey = (req, res) => {
  const { studentName, answer1, answer2, answer3 } = req.body;
  var sql = `insert into survey
             (studentName, answer1, answer2, answer3)
             values (?, ?, ?, ?)`;
  db.run(sql, [studentName, answer1, answer2, answer3], (err, rows) => {
    if (err) {
      return res.status(400).json({
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      });
    } else {
      res.status(200).json({
        status: rows,
      });
    }
  });
};
module.exports = survey;

const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const survey = (req, res) => {
  var sql = `insert into survey
             (studentName, answer1, answer2, answer3)
             values (?, ?, ?, ?)`;
  console.log(req.body);
  db.run(
    sql,
    [
      req.body.studentName,
      req.body.answer1,
      req.body.answer2,
      req.body.answer3
    ],
    (err, rows) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).json({
          status: rows
        });
      }
    }
  );
};
module.exports = survey;

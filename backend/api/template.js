const sqlite3 = require("sqlite3").verbose();
const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const template = (req, res) => {
  var sql = `insert into template
             (title, duration, serves)
             values (?, ?, ?)`;
  console.log(req.body);
  db.run(
    sql,
    [
      req.body.title,
      req.body.duration,
      req.body.serves,
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
module.exports = template;

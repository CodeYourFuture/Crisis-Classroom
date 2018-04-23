const sqlite3 = require("sqlite3").verbose();

const filename = "./database/mydatabase.sqlite";
let db = new sqlite3.Database(filename);

const lessons = (req, res) => {
  var sql = `select 
            *
            from lessons 
            join tools 
            join ingredients 
            join instructions 
            where lessons.id = tools.lessonId = ingredients.lessonId = instructions.lessonId `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).json({
        status: rows
      });
    }
  });
};

module.exports = lessons;

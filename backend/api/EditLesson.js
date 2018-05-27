const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const EditLesson = (req, res) => {
  const lesson = req.body;
console.log(lesson)
};


module.exports = EditLesson;
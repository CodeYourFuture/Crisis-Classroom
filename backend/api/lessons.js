const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";

let db = new sqlite3.Database(filename);

const lessonTitle = (req, res) => {
  var sql = `select * from tools `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).json({
        lesson: rows
      });
    }
  });
};
// const tool = (req, res) => {
//   var sql = `select * from tools`;
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       res.status(500).end();
//     } else {
//       res.status(200).json({
//         tools: rows
//       });
//     }
//   });
// };
// const ingredient = (req, res) => {
//   var sql = `select * from ingredients`;

//   db.all(sql, [], (err, ingredients) => {});
// };
// const instruction = (req, res) => {
//   var sql = `select * from instructions `;

//   db.all(sql, [], (err, instructions) => {});
// };

module.exports = lessonTitle;

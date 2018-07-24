const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const DeleteLesson = (req, res) => {
  const lesson_id = req.body.id;

  deleteLessons(lesson_id)
    .then(() => deleteTool(lesson_id))
    .then(() => deleteIngredient(lesson_id))
    .then(() => deleteInstruction(lesson_id))
    .then(() => res.json(console.log(res)))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const deleteLessons = (lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM lessons where id=?`;
    db.run(sql, [lesson_id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const deleteTool = (lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM tools where lesson_id=?`;
    db.run(sql, [lesson_id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const deleteIngredient = (lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM ingredients where lesson_id=?`;
    db.run(sql, [lesson_id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const deleteInstruction = (lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM  instructions where lesson_id=?`;
    db.run(sql, [lesson_id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = DeleteLesson;

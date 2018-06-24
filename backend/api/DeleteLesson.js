const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const DeleteLesson = (req, res) => {
  const lessonId = req.body.id;

  deleteLessons(lessonId)
    .then(() => deleteTool(lessonId))
    .then(() => deleteIngredient(lessonId))
    .then(() => deleteInstruction(lessonId))
    .then(() => res.json(console.log(res)))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const deleteLessons = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM lessons where id=?`;
    db.run(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const deleteTool = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM tools where lessonId=?`;
    db.run(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const deleteIngredient = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM ingredients where lessonId=?`;
    db.run(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const deleteInstruction = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `DELETE FROM  instructions where lessonId=?`;
    db.run(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = DeleteLesson;

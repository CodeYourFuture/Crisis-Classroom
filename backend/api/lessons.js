const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';

let db = new sqlite3.Database(filename);

const lessonTitle = (req, res) => {
  getLessons()
    .then((lessons) =>
      Promise.all(lessons.map((lesson) => getLessonData(lesson)))
    )
    .then((lessonsPlusData) => res.json(lessonsPlusData))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const getLessonData = (lesson) => {
  return Promise.all([
    getTools(lesson.id),
    getIngredients(lesson.id),
    getInstructions(lesson.id),
  ]).then(([tools, ingredients, instructions]) => {
    return {
      ...lesson,
      tools: tools,
      ingredients: ingredients,
      instructions: instructions,
    };
  });
};

const getLessons = () => {
  return new Promise((resolve, reject) => {
    var sql = `select * from lessons`;
    db.all(sql, [], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const getTools = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `select * from tools where tools.lessonId= ?`;
    db.all(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const getIngredients = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `select * from ingredients where ingredients.lessonId=?`;
    db.all(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

const getInstructions = (lessonId) => {
  return new Promise((resolve, reject) => {
    var sql = `select * from instructions where instructions.lessonId=?`;
    db.all(sql, [lessonId], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};

module.exports = lessonTitle;

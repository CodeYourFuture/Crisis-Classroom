const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const lessonTitle = (req, res) => {
  getLessons()
    .then(lessons => Promise.all(lessons.map(lesson => getLessonData(lesson))))
    .then(lessonsPlusData => res.json(lessonsPlusData))
    .catch(err => {
      res.status(400).json({
        err,
        msg: "Sorry something happened on the server, please try again later."
      });
    });
};

const getLessonData = lesson => {
  return Promise.all([
    getTools(lesson.id),
    getIngredients(lesson.id),
    getInstructions(lesson.id)
  ]).then(([tools, ingredients, instructions]) => {
    return {
      ...lesson,
      tools,
      ingredients,
      instructions
    };
  });
};
const getLessons = () => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Sorry something happened on the server, please try again later."
          });
        }
        client.query(`select * from lessons`).then(result => {
          const data = result.rows;
          return resolve(data);
        });
        done();
      }
    );
  });
};

const getTools = lesson_id => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(`select * from tools where lesson_id=$1`, [lesson_id])
          .then(result => {
            const data = result.rows;
            return resolve(data);
          });
        done();
      }
    );
  });
};

const getIngredients = lesson_id => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(`select * from ingredients where lesson_id=$1`, [lesson_id])
          .then(result => {
            const data = result.rows;
            return resolve(data);
          });
        done();
      }
    );
  });
};

const getInstructions = lesson_id => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(`select * from instructions where lesson_id=$1`, [lesson_id])
          .then(result => {
            const data = result.rows;
            return resolve(data);
          });
        done();
      }
    );
  });
};

module.exports = lessonTitle;

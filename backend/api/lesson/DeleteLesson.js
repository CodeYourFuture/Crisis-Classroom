const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const DeleteLesson = (req, res) => {
  const lesson_id = req.body.id;

  deleteLessons(lesson_id)
    .then(() => deleteTool(lesson_id))
    .then(() => deleteIngredient(lesson_id))
    .then(() => deleteInstruction(lesson_id))
    .then(() => res.json({  msg: 'Success! Your lesson has been created.' }))
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
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client.query(`DELETE FROM lessons where id=$1`, [lesson_id]).then(() => {
        return resolve();
      });
      done()
    });
  });
};

const deleteTool = (lesson_id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`DELETE FROM tools where lesson_id=$1`, [lesson_id])
        .then(() => {
          return resolve();
        });
        done()
    });
  });
};

const deleteIngredient = (lesson_id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`DELETE FROM ingredients where lesson_id=$1`, [lesson_id])
        .then(() => {
          return resolve();
        });
        done()
    });
  });
};

const deleteInstruction = (lesson_id) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(`DELETE FROM  instructions where lesson_id=$1`, [lesson_id])
        .then(() => {
          return resolve();
        });
        done()
    });
  });
};

module.exports = DeleteLesson;

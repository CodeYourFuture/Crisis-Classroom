const pg = require("pg");

const connectionString = process.env.DATABASE_URL;
let lesson_id = [];
const creatLessons = (req, res) => {
  const date_id = Date.now().toString();
  const lesson = req.body;
  const { tools, ingredients, instructions } = lesson;
  saveLessons(lesson, date_id)
    .then(() =>
      tools.forEach(tool => {
        saveTool(tool);
      })
    )
    .then(() =>
      ingredients.forEach(ingredient => {
        saveIngredient(ingredient);
      })
    )
    .then(() =>
      instructions.forEach(instruction => {
        saveInstruction(instruction);
      })
    )
    .then(() => (lesson_id = []))
    .then(() => {
      res.json({ msg: "Success! Your lesson has been created." });
    })
    .catch(err =>
      res.status(400).json({
        err,
        msg: "Sorry something happened on the server, please try again later."
      })
    );
};

const saveLessons = (lesson, date_id) => {
  const {
    lesson_title,
    lesson_title_image,
    time_to_prepare,
    time_to_prepare_image,
    number_of_people,
    number_of_people_image
  } = lesson;
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
          .query(
            `insert into lessons
        (
          lesson_title,
          lesson_title_image,
          time_to_prepare,
          time_to_prepare_image,
          number_of_people,
          number_of_people_image,
        date_id)
        values ($1, $2, $3, $4, $5, $6, $7)`,
            [
              lesson_title,
              lesson_title_image,
              time_to_prepare,
              time_to_prepare_image,
              number_of_people,
              number_of_people_image,
              date_id
            ]
          )
          .then(result => {
            if (result) {
              if (err) {
                return reject({
                  msg:
                    "Sorry something happened on the server, please try again later."
                });
              }
              client
                .query(`select id from lessons where date_id=$1`, [date_id])
                .then(result => {
                  if (result) {
                    id = result.rows[0].id;
                    lesson_id.push(id);
                    return resolve();
                  }
                });
            }
          });
        done();
      }
    );
  });
};

const saveTool = tool => {
  const id = lesson_id[0];
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
          .query(
            `insert into tools
          (lesson_id,tool_id, tool_name, tool_image)
          values ($1, $2, $3, $4)`,
            [id, tool.tool_id, tool.tool_name, tool.tool_image]
          )
          .then(result => {
            if (result) {
              if (err) {
                return reject({
                  msg:
                    "Sorry something happened on the server, please try again later."
                });
              }
              return resolve();
            }
          });
        done();
      }
    );
  });
};

const saveIngredient = ingredient => {
  const id = lesson_id[0];
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
          .query(
            `insert into ingredients
          (lesson_id, ingredient_id, ingredient_name, ingredient_image)
          values ($1, $2, $3, $4)`,
            [
              id,
              ingredient.ingredient_id,
              ingredient.ingredient_name,
              ingredient.ingredient_image
            ]
          )
          .then(result => {
            if (result) {
              if (err) {
                return reject({
                  msg:
                    "Sorry something happened on the server, please try again later."
                });
              }
              return resolve();
            }
          });
        done();
      }
    );
  });
};

const saveInstruction = instruction => {
  const id = lesson_id[0];
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
          .query(
            `insert into instructions
          (lesson_id,instruction_id, instruction_name, instruction_image)
          values ($1, $2, $3, $4)`,
            [
              id,
              instruction.instruction_id,
              instruction.instruction_name,
              instruction.instruction_image
            ]
          )
          .then(result => {
            if (result) {
              if (err) {
                return reject({
                  msg:
                    "Sorry something happened on the server, please try again later."
                });
              }
              return resolve();
            }
          });
        done();
      }
    );
  });
};

module.exports = creatLessons;

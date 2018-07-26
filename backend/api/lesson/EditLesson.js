const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const EditLesson = (req, res) => {
  const lesson = req.body;
  const { tools, ingredients, instructions, lesson_id } = lesson;
  editLessons(lesson)
    .then(() => tools.forEach((tool) => editTool(tool, lesson_id)))
    .then(() =>
      ingredients.forEach((ingredient) => editIngredient(ingredient, lesson_id))
    )
    .then(() =>
      instructions.forEach((instruction) =>
        editInstruction(instruction, lesson_id)
      )
    )
    .then(() =>
      res.json({ msg: 'Success! Your lesson has been edited.' })
    )
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const editLessons = (lesson) => {
  const {
    lesson_id,
    lesson_title,
    lesson_title_image,
    time_to_prepare,
    time_to_prepare_image,
    number_of_people,
    number_of_people_image,
  } = lesson;
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
      client
        .query(
          `UPDATE lessons SET
        lesson_title=$1 ,
        lesson_title_image=$2 ,
        time_to_prepare=$3,
        time_to_prepare_image=$4,
        number_of_people=$5,
        number_of_people_image=$6
        where id=$7`,
          [
            lesson_title,
            lesson_title_image,
            time_to_prepare,
            time_to_prepare_image,
            number_of_people,
            number_of_people_image,
            lesson_id,
          ]
        )
        .then(() => {
          return resolve();
        });
    });
  });
};

const editTool = (tool, lesson_id) => {
  return new Promise((resolve, reject) => {
    if (tool.id) {
      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        client
          .query(
            `UPDATE tools set
            tool_name=$1, tool_image=$2 where id=$3`,
            [tool.tool_name, tool.tool_image, tool.id]
          )
          .then(() => {
            return resolve();
          });
      });
    } else {
      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        client
          .query(
            `insert into tools
            (lesson_id, tool_id, tool_name, tool_image)
            values ($1, $2, $3, $4)`,
            [lesson_id, tool.tool_id, tool.tool_name, tool.tool_image]
          )
          .then(() => {
            return resolve();
          });
      });
    }
  });
};

const editIngredient = (ingredient, lesson_id) => {
  return new Promise((resolve, reject) => {
    if (ingredient.id) {
      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        client
          .query(
            `UPDATE ingredients set
            ingredient_name=$1, ingredient_image=$2 where id=$3`,
            [
              ingredient.ingredient_name,
              ingredient.ingredient_image,
              ingredient.id,
            ]
          )
          .then(() => {
            return resolve();
          });
      });
    } else {
      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        client
          .query(
            `insert into ingredients
            (lesson_id, ingredient_id, ingredient_name, ingredient_image)
            values ($1, $2, $3, $4)`,
            [
              lesson_id,
              ingredient.ingredient_id,
              ingredient.ingredient_name,
              ingredient.ingredient_image,
            ]
          )
          .then(() => {
            return resolve();
          });
      });
    }
  });
};

const editInstruction = (instruction, lesson_id) => {
  return new Promise((resolve, reject) => {
    if (instruction.id) {
      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        client
          .query(
            `UPDATE instructions set
            instruction_name=$1, instruction_image=$2 where id=$3`,
            [
              instruction.instruction_name,
              instruction.instruction_image,
              instruction.id,
            ]
          )
          .then(() => {
            return resolve();
          });
      });
    } else {
      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          return reject({
            msg:
              'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        client
          .query(
            `insert into instructions
            (lesson_id,instruction_id, instruction_name, instruction_image)
            values ($1, $2, $3, $4)`,
            [
              lesson_id,
              instruction.instruction_id,
              instruction.instruction_name,
              instruction.instruction_image,
            ]
          )
          .then(() => {
            return resolve();
          });
      });
    }
  });
};

module.exports = EditLesson;

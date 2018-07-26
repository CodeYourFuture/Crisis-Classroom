const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const creatLessons = (req, res) => {
  const lesson_id = Date.now().toString();
  const lesson = req.body;

  const { tools, ingredients, instructions } = lesson;
  saveLessons(lesson, lesson_id)
    .then(() => tools.forEach((tool) => saveTool(tool, lesson_id)))
    .then(() =>
      ingredients.forEach((ingredient) => saveIngredient(ingredient, lesson_id))
    )
    .then(() =>
      instructions.forEach((instruction) =>
        saveInstruction(instruction, lesson_id)
      )
    )
    .then(() => res.json(console.log(res)))
    .catch((err) =>
      res.status(400).json({
        err,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      })
    );
};

const saveLessons = (lesson, lesson_id) => {
  const {
    lesson_title,
    lesson_title_image,
    time_to_prepare,
    time_to_prepare_image,
    number_of_people,
    number_of_people_image,
  } = lesson;
  return new Promise((resolve, reject) => {
    var sql = `insert into lessons
    (id,
      lesson_title,
      lesson_title_image,
      time_to_prepare,
      time_to_prepare_image,
      number_of_people,
      number_of_people_image)
    values (?, ?, ?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [
        lesson_id,
        lesson_title,
        lesson_title_image,
        time_to_prepare,
        time_to_prepare_image,
        number_of_people,
        number_of_people_image,
      ],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

const saveTool = (tool, lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `insert into tools
          (lesson_id,tool_id, tool_name, tool_image)
          values (?, ?, ?, ?)`;
    db.run(
      sql,
      [lesson_id, tool.tool_id, tool.tool_name, tool.tool_image],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

const saveIngredient = (ingredient, lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `insert into ingredients
          (lesson_id, ingredient_id, ingredient_name, ingredient_image)
          values (?, ?, ?, ?)`;
    db.run(
      sql,
      [
        lesson_id,
        ingredient.ingredient_id,
        ingredient.ingredient_name,
        ingredient.ingredient_image,
      ],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

const saveInstruction = (instruction, lesson_id) => {
  return new Promise((resolve, reject) => {
    var sql = `insert into instructions
          (lesson_id,instruction_id, instruction_name, instruction_image)
          values (?, ?, ?, ?)`;
    db.run(
      sql,
      [
        lesson_id,
        instruction.instruction_id,
        instruction.instruction_name,
        instruction.instruction_image,
      ],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

module.exports = creatLessons;

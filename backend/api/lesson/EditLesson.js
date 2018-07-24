const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

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
    .then(() => res.json(console.log(res)))
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
    var sql = `UPDATE lessons SET
      lesson_title=? ,
      lesson_title_image=? ,
      time_to_prepare=?,
      time_to_prepare_image=?,
      number_of_people=?,
      number_of_people_image=?
      where id=?`;
    db.run(
      sql,
      [
        lesson_title,
        lesson_title_image,
        time_to_prepare,
        time_to_prepare_image,
        number_of_people,
        number_of_people_image,
        lesson_id,
      ],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

const editTool = (tool, lesson_id) => {
  return new Promise((resolve, reject) => {
    if (tool.id) {
      var sql = `UPDATE tools set
  tool_name=?, tool_image=? where id=?`;
      db.run(sql, [tool.tool_name, tool.tool_image, tool.id], (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    } else {
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
    }
  });
};

const editIngredient = (ingredient, lesson_id) => {
  return new Promise((resolve, reject) => {
    if (ingredient.id) {
      var sql = `UPDATE ingredients set
            ingredient_name=?, ingredient_image=? where id=?`;
      db.run(
        sql,
        [ingredient.ingredient_name, ingredient.ingredient_image, ingredient.id],
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    } else {
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
    }
  });
};

const editInstruction = (instruction, lesson_id) => {
  return new Promise((resolve, reject) => {
    if (instruction.id) {
      var sql = `UPDATE instructions set
             instruction_name=?, instruction_image=? where id=?`;
      db.run(
        sql,
        [
          instruction.instruction_name,
          instruction.instruction_image,
          instruction.id,
        ],
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    } else {
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
    }
  });
};

module.exports = EditLesson;

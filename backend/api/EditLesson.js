const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const EditLesson = (req, res) => {
  const lesson = req.body;
  console.log(lesson);
  const { tools, ingredients, instructions, lessonId } = lesson;
  saveLessons(lesson)
    .then(() => tools.forEach(tool => saveTool(tool, lessonId)))
    .then(() =>
      ingredients.forEach(ingredient => saveIngredient(ingredient, lessonId))
    )
    .then(() =>
      instructions.forEach(instruction =>
        saveInstruction(instruction, lessonId)
      )
    )
    .then(() => res.json(console.log(res)))
    .catch(err => res.status(400).json(err));
};

const saveLessons = lesson => {
  const {
    lessonId,
    lessonTitle,
    lessonTitleImage,
    timeToPrepare,
    timeToPrepareImage,
    numberOfPeople,
    numberOfPeopleImage
  } = lesson;
  return new Promise((resolve, reject) => {
    var sql = `UPDATE lessons SET
      lessonTitle=? ,
      lessonTitleImage=? ,
      timeToPrepare=?,
      timeToPrepareImage=?,
      numberOfPeople=?,
      numberOfPeopleImage=?
      where id=?`;
    db.run(
      sql,
      [
        lessonTitle,
        lessonTitleImage,
        timeToPrepare,
        timeToPrepareImage,
        numberOfPeople,
        numberOfPeopleImage,
        lessonId
      ],
      (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};

const saveTool = (tool, lessonId) => {
  return new Promise((resolve, reject) => {
    if (tool.id) {
      var sql = `UPDATE tools set
  toolName=?, toolImage=? where id=?`;
      db.run(sql, [tool.toolName, tool.toolImage, tool.id], (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    } else {
      var sql = `insert into tools
      (lessonId,toolId, toolName, toolImage)
      values (?, ?, ?, ?)`;
      db.run(
        sql,
        [lessonId, tool.toolId, tool.toolName, tool.toolImage],
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    }
  });
};

const saveIngredient = (ingredient, lessonId) => {
  return new Promise((resolve, reject) => {
    if (ingredient.id) {
      var sql = `UPDATE ingredients set
            ingredientName=?, ingredientImage=? where id=?`;
      db.run(
        sql,
        [ingredient.ingredientName, ingredient.ingredientImage, ingredient.id],
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    } else {
      var sql = `insert into ingredients
      (lessonId, ingredientId, ingredientName, ingredientImage)
      values (?, ?, ?, ?)`;
      db.run(
        sql,
        [
          lessonId,
          ingredient.ingredientId,
          ingredient.ingredientName,
          ingredient.ingredientImage
        ],
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    }
  });
};

const saveInstruction = (instruction, lessonId) => {
  return new Promise((resolve, reject) => {
    if (instruction.id) {
      var sql = `UPDATE instructions set
             instructionName=?, instructionImage=? where id=?`;
      db.run(
        sql,
        [
          instruction.instructionName,
          instruction.instructionImage,
          instruction.id
        ],
        (err, data) => {
          if (err) return reject(err);
          return resolve(data);
        }
      );
    } else {
      var sql = `insert into instructions
      (lessonId,instructionId, instructionName, instructionImage)
      values (?, ?, ?, ?)`;
      db.run(
        sql,
        [
          lessonId,
          instruction.instructionId,
          instruction.instructionName,
          instruction.instructionImage
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

const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const creatLessons = (req, res) => {
  const lessonId = Date.now().toString();
  // console.log(req.body);
  const lesson = req.body;

    const {
      tools,
      ingredients,
      instructions
    } = lesson;
     saveLessons(lesson, lessonId)
    .then(() => tools.forEach(tool => saveTool(tool, lessonId)))
    .then(() => ingredients.forEach(ingredient => saveIngredient(ingredient, lessonId)))
    .then(() => instructions.forEach(instruction => saveInstruction(instruction, lessonId)))
    .then(() => res.json(console.log(res)))
    .catch(err => res.status(400).json(err));
};

const saveLessons= (lesson, lessonId) => {
    const {
        lessonTitle,
        lessonTitleImage,
        timeToPrepare,
        timeToPrepareImage,
        numberOfPeople,
        numberOfPeopleImage
      } = lesson;
  return new Promise((resolve, reject) => {
    var sql = `insert into lessons
    (id,
      lessonTitle,
      lessonTitleImage,
      timeToPrepare,
      timeToPrepareImage,
      numberOfPeople,
      numberOfPeopleImage)
    values (?, ?, ?, ?, ?, ?, ?)`;
    db
      .run(sql, [
        lessonId,
        lessonTitle,
        lessonTitleImage,
        timeToPrepare,
        timeToPrepareImage,
        numberOfPeople,
        numberOfPeopleImage
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
  });
};

const saveIngredient = (ingredient, lessonId) => {
  return new Promise((resolve, reject) => {
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
  });
};

const saveInstruction = (instruction, lessonId) => {
  return new Promise((resolve, reject) => {
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
  });
};

module.exports = creatLessons;
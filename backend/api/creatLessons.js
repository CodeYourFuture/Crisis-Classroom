const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const creatLessons = (req, res) => {
  const lessonId = Date.now().toString();
  // console.log(req.body);
  const lesson = req.body;

  saveToDb(lesson, lessonId);
};
const saveToDb = (lesson, lessonId) => {
  const { lessonTitles, tools, ingredients, instructions } = lesson;
  lessonTitles.forEach(lessonTitle => saveLessonTitle(lessonTitle, lessonId));
  tools.forEach(tool => saveTool(tool, lessonId));
  ingredients.forEach(ingredient => saveIngredient(ingredient, lessonId));
  instructions.forEach(instruction => saveInstruction(instruction, lessonId));
    var sql = `insert into lessons
      (lessonId)
      values (?)`;
    db.run(sql, [lessonId]);
};
const saveLessonTitle = (lessonTitle, lessonId) => {
  var sql = `insert into lessonTitles
    (lessonId ,lessonTitleId, lessonTitleName, lessonTitleImage)
    values (?, ?, ?,?)`;
  db.run(sql, [
    lessonId,
    lessonTitle.lessonTitleId,
    lessonTitle.lessonTitleName,
    lessonTitle.lessonTitleImage
  ]);
};
const saveTool = (tool, lessonId) => {
  var sql = `insert into tools
    (lessonId,toolId, toolName, toolImage)
    values (?, ?, ?, ?)`;
  db.run(sql, [
    lessonId,
    tool.toolId,
    tool.toolName,
    tool.toolImage
  ]);
};
const saveIngredient = (ingredient, lessonId) => {
  var sql = `insert into ingredients
    (lessonId, ingredientId, ingredientName, ingredientImage)
    values (?, ?, ?, ?)`;
  db.run(sql, [
    lessonId,
    ingredient.ingredientId,
    ingredient.ingredientName,
    ingredient.ingredientImage
  ]);
};
const saveInstruction = (instruction, lessonId) => {
  var sql = `insert into instructions
    (lessonId,instructionId, instructionName, instructionImage)
    values (?, ?, ?, ?)`;
  db.run(sql, [
    lessonId,
    instruction.instructionId,
    instruction.instructionName,
    instruction.instructionImage
  ]);
};
module.exports = creatLessons;

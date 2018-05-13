const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const creatLessons = (req, res) => {
  const lessonId = Date.now().toString();
  const lesson = {
    lessonTitles: [
      { id: 1, name: "book", image: "https://www.amazon.com/s3/files/book.jpg" },
      { id: 2, name: "pen", image: "https://www.amazon.com/s3/files/pen.jpg" }
    ],
    tools: [
      { id: 1, name: "one", image: "https://www.amazon.com/s3/files/one.jpg" },
      { id: 2, name: "two", image: "https://www.amazon.com/s3/files/two.jpg" }
    ],
    ingredients: [
      { id: 1, name: "three", image: "https://www.amazon.com/s3/files/three.jpg" },
      { id: 2, name: "four", image: "https://www.amazon.com/s3/files/four.jpg" }
    ],
    instructions: [
      { id: 1, name: "five", image: "https://www.amazon.com/s3/files/five.jpg" },
      { id: 2, name: "six", image: "https://www.amazon.com/s3/files/six.jpg" }
    ]
  };

  saveToDb(lesson, lessonId);
};
const saveToDb = (lesson, lessonId) => {
  const { lessonTitles, tools, ingredients, instructions } = lesson;
  lessonTitles.forEach(lessonTitle => saveLessonTitle(lessonTitle, lessonId));
  tools.forEach(tool => saveTool(tool, lessonId));
  ingredients.forEach(ingredient => saveIngredient(ingredient, lessonId));
  instructions.forEach(instruction => saveInstruction(instruction, lessonId));
};
const saveLessonTitle = (lessonTitle, lessonId) => {
  var sql = `insert into lessonTitles
    (lessonId, name, image)
    values (?, ?, ?)`;
  db.run(sql, [lessonId, lessonTitle.name, lessonTitle.image]);
};
const saveTool = (tool, lessonId) => {
  var sql = `insert into tools
    (lessonId, name, image)
    values (?, ?, ?)`;
  db.run(sql, [lessonId, tool.name, tool.image]);
};
const saveIngredient = (ingredient, lessonId) => {
  var sql = `insert into ingredients
    (lessonId, name, image)
    values (?, ?, ?)`;
  db.run(sql, [lessonId, ingredient.name, ingredient.image]);
};
const saveInstruction = (instruction, lessonId) => {
  var sql = `insert into instructions
    (lessonId, name, image)
    values (?, ?, ?)`;
  db.run(sql, [lessonId, instruction.name, instruction.image]);
};
module.exports = creatLessons;

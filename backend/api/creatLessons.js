const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const creatLessons = (req, res) => {
  const lessonId = Date.now().toString();
  console.log(req.body)
  const lesson = {
    lessonTitles: [
      {
        lessonTitleIdId: 1,
        lessonTitlName: "book",
        lessonTitlImage: "https://www.amazon.com/s3/files/book.jpg"
      },
      {
        lessonTitleIdId: 2,
        lessonTitlName: "pen",
        lessonTitlImage: "https://www.amazon.com/s3/files/pen.jpg"
      }
    ],
    tools: [
      {
        toolId: 1,
        toolName: "one",
        toolImage: "https://www.amazon.com/s3/files/one.jpg"
      },
      {
        toolId: 2,
        toolName: "two",
        toolImage: "https://www.amazon.com/s3/files/two.jpg"
      }
    ],
    ingredients: [
      {
        ingredientId: 1,
        ingredientName: "three",
        ingredientImage: "https://www.amazon.com/s3/files/three.jpg"
      },
      {
        ingredientId: 2,
        ingredientName: "four",
        ingredientImage: "https://www.amazon.com/s3/files/four.jpg"
      }
    ],
    instructions: [
      {
        instructionId: 1,
        instructionsName: "five",
        instructionsImage: "https://www.amazon.com/s3/files/five.jpg"
      },
      {
        instructionId: 2,
        instructionsName: "six",
        instructionsImage: "https://www.amazon.com/s3/files/six.jpg"
      }
    ]
  };

  saveToDb(lesson, lessonId);
};
const saveToDb = (lesson, lessonId) => {
  const { lessonTitles, tools, ingredients, instructions } = lesson;
  (lessonId => saveLessonId( lessonId));
  lessonTitles.forEach(lessonTitle => saveLessonTitle(lessonTitle, lessonId));
  tools.forEach(tool => saveTool(tool, lessonId));
  ingredients.forEach(ingredient => saveIngredient(ingredient, lessonId));
  instructions.forEach(instruction => saveInstruction(instruction, lessonId));
};
const saveLessonId= (lessonId) => {
  var sql = `insert into lessons
    (lessonId)
    values (?)`;
  db.run(sql, [lessonId]);
};
const saveLessonTitle = (lessonTitle, lessonId) => {
  var sql = `insert into lessonTitles
    (lessonId ,lessonTitleId, lessonTitleName, lessonTitleImage)
    values (?, ?, ?,?)`;
  db.run(sql, [lessonId, req.body.lessonTitleId, req.body.lessonTitleName, req.body.lessonTitleImage]);
};
const saveTool = (tool, lessonId) => {
  var sql = `insert into tools
    (lessonId,toolId, toolName, toolImage)
    values (?, ?, ?, ?)`;
  db.run(sql, [lessonId,req.boy.toolId, req.body.toolName, req.body.toolImage]);
}
const saveIngredient = (ingredient, lessonId) => {
  var sql = `insert into ingredients
    (lessonId, ingredientId, ingredientName, ingredientImage)
    values (?, ?, ?, ?)`;
  db.run(sql, [lessonId, req.body.ingredientId , req.body.ingredientName, req.body.ingredientImage]);
};
const saveInstruction = (instruction, lessonId) => {
  var sql = `insert into instructions
    (lessonId,instructionId, instructionName, instructionImage)
    values (?, ?, ?, ?)`;
  db.run(sql, [lessonId, req.bod.instructionId, req.body.instructionName, req.body.instructionImage]);
};
module.exports = creatLessons;

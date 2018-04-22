const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyparser = require("body-parser");
const cors = require("cors");

const filename = "./database/mydatabase.sqlite";
let db = new sqlite3.Database(filename);

const router = express.Router();
router.use(cors());
router.use(bodyparser.json());

router.get("/lessons", function(req, res) {
  var sql = `select 
            *
            from lessons 
            join tools 
            join ingredients 
            join instructions 
            where lessons.id = tools.lessonId = ingredients.lessonId = instructions.lessonId `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).json({
        status: rows
      });
    }
  });
});

module.exports = router;


// lessons.id,
//             lessons.lessonTitle,
//             lessons.lessonImg,
//             lessons.timeToPrepair,
//             lessons.numberOfPeople,
//             lessons.peopleSymbole,
//             lessons.ingredients,
//             lessons.instructions,
//             tools.toolName,
//             tools.toolsSymbole,
//             ingredients.ingredientName,
//             ingredients.ingredientSymbole,
//             instructions.instructionsName,
//             instructions.instructionsSymbole
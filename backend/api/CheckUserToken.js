const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);


const CheckUserToken = (req, res) => {
  const token = req.params.token;
  var sql =
    "select resetPasswordToken, resetPasswordExpires, userName from users where resetPasswordToken=?";
  db.all(sql, [token], (err, rows) => {
    const [user] = rows;
    if (!user) {
      return res.status(400).json({msg: "Sorry this link is Wrong."});
    } else if (err) {
      res.status(400).json(err);
    } else if (Date.now() > user.resetPasswordExpires) {
      return res.status(400).json({msg: "Sorry this link is expired."});
    } else {
      res.status(200).json({
        rows
      });
    }
  });
};
module.exports = CheckUserToken;

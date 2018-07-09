const sqlite3 = require('sqlite3').verbose();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);
const CheckAdmin = require('../../helpers/checkAdmin');

const Admin = (req, res) => {
    const { userName } = req.body;
    CheckAdmin(userName)
    .then((data) => {
        res.json(data);
    })
    .catch((err) =>
        res.status(400).json({
          err,
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        })
      );
  };
  
module.exports = Admin;

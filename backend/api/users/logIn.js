const sqlite3 = require ('sqlite3').verbose ();
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database (filename);

const login = (req, res) => {
  const {userName, password} = req.body;
  var sql = `select id, title, userName, password, admin, teacher, avatar from users where userName=?`;
  db.all (sql, [userName], (err, rows) => {
    const [data] = rows;
    if (rows.length === 0) {
      return res.status (400).json ({
        sucess: false,
        token: null,
        msg: 'username or password are wrong',
      });
    }
    if (err) {
      return res.status (400).json ({
        sucess: false,
        token: null,
        msg: 'Ops! Sorry something happened on the server, please try again later.',
      });
    }
    if (data.teacher !== 1) {
      return res.status (400).json ({
        sucess: false,
        token: null,
        msg: ' Sorry your registeration has not been accepted yet, please try again later.',
      });
    } else {
      const hash = data.password;
      bcrypt.compare (password, hash, (err, respons) => {
        if (err) {
          return res.status (400).json ({
            sucess: false,
            token: null,
            msg: 'Ops! Sorry something happened on the server, please try again later.',
          });
        }
        if (respons) {
          let token = jwt.sign (
            {id: data.id, title: data.title, userName: data.userName, admin: data.admin, avatar: data.avatar},
            process.env.JWT_SECRET,
            {expiresIn: 129600}
          );
          return res.json ({
            sucess: true,
            err: null,
            token,
          });
        } else {
          return res.status (400).json ({
            sucess: false,
            token: null,
            msg: 'username or password are wrong',
          });
        }
      });
    }
  });
};

module.exports = {
  login: login,
};

//https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const login = (req, res) => {
  const { user_name, password } = req.body;
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      return res.status(400).json({
        sucess: false,
        token: null,
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      });
    }
     client
      .query(
        `select id, title, user_name, password, admin, teacher, avatar from users where user_name=$1`,
        [user_name]
      )
      .then((result) => {
        const user = result.rows[0];
        if (result.rowCount == 0) {
          return res.status(400).json({
            sucess: false,
            token: null,
            msg: 'user_name or password are wrong',
          });
        } else {
          const hash = user.password;
          bcrypt.compare(password, hash, (err, respons) => {
            if (err) {
              return res.status(400).json({
                sucess: false,
                token: null,
                msg:
                  'Ops! Sorry something happened on the server, please try again later.',
              });
            }
            if (!respons) {
              return res.status(400).json({
                sucess: false,
                token: null,
                msg: 'user_name or password are wrong',
              });
            } else {
              if (user.teacher) {
                let token = jwt.sign(
                  {
                    id: user.id,
                    title: user.title,
                    user_name: user.user_name,
                    admin: user.admin,
                    avatar: user.avatar,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: 129600 }
                );
                return res.json({
                  sucess: true,
                  err: null,
                  token,
                });
              } else {
                return res.status(400).json({
                  sucess: false,
                  token: null,
                  msg:
                    ' Sorry your registeration has not been accepted yet, please try again later.',
                });
              }
            }
          });
        }
      });
      done()
  });
};

module.exports = {
  login: login,
};

//https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database(filename);

const register = (req, res) => {
  const userInfo = req.body;

  security(userInfo)
    .then((data) => saveUserData(data, userInfo))
    .then((data) => sendEmail(data, userInfo))
    .then(() => {
      res.status(200).json({
        msg: `Success! Thank you for your registrating.`,
      });
    })
    .catch((data) => {
      // res.status(400).json({err})didn't work
      // res.status(500).send({err})didn't work
      const { err, msg } = data;
      res.status(200).json({ err, msg }); //it is not a good idea but only way i could handel it
    });
};

const security = (userInfo) => {
  const { email, userName } = userInfo;
  return Promise.all([
    creatToken(),
    createHash(userInfo),
    checkEmail(email),
    checkUserName(userName),
  ]).then(([token, hash]) => {
    return {
      token,
      hash,
    };
  });
};

const creatToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buf) => {
      var token = buf.toString('hex');
      if (err) return reject(err);
      return resolve(token);
    });
  });
};
const createHash = (userInfo) => {
  const { password, confirmPassword } = userInfo;
  return new Promise((resolve, reject) => {
    if (password === confirmPassword) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    } else return reject({ err, msg: 'password does not mache' });
  });
};

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    var sql = 'select users.email from users where  email=?';
    db.all(sql, [email], (err, rows) => {
      const userEmail = rows[0];
      if (!userEmail) {
        return resolve();
      } else return reject({ err, msg: 'You already registerd' });
    });
  });
};
const checkUserName = (userName) => {
  return new Promise((resolve, reject) => {
    var sql = 'select users.userName from users where  userName=?';
    db.all(sql, [userName], (err, rows) => {
      const user = rows[0];
      if (!user) {
        return resolve();
      } else return reject({ err, msg: 'You already registerd' });
    });
  });
};

const saveUserData = (data, userInfo) => {
  const { token, hash } = data;
  const {
    title,
    firstName,
    surName,
    userName,
    email,
    avatar,
    aboutUser,
    uuid,
  } = userInfo;

  return new Promise((resolve, reject) => {
    var sql = `insert into users
              (title, firstName, surName, userName, token, email, password, avatar, aboutUser, uuid)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(
      sql,
      [
        title,
        firstName,
        surName,
        userName,
        token,
        email,
        hash,
        avatar,
        aboutUser,
        uuid,
      ],
      (err, rows) => {
        if (err)
          return reject({
            err,
            msg: 'Something happened while saving user data into database',
          });
        return resolve({ data, userInfo });
      }
    );
  });
};

const sendEmail = (data) => {
  const { token } = data.data;
  const { title, firstName, surName, email, avatar, aboutUser } = data.userInfo;
  return new Promise((resolve, reject) => {
    var smtpTransport = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports,
      auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_PASS,
      },
    });
    var mailOptions = {
      to: process.env.USER_GMAIL,
      from: email,
      subject: 'accept registration',
      text: ` http://localhost:3000/accept-registration/${token}`,
    };
    smtpTransport.sendMail(mailOptions, (err) => {
      if (err)
        return reject({
          err,
          msg: 'Success! Thank you for your registrating.',
        });
      return resolve();
    });
  });
};

module.exports = register;

const bcrypt = require('bcrypt');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

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
      const { err, msg } = data;
      res.status(200).json({ msg, err });
    });
};

const security = (userInfo) => {
  const { email, userName } = userInfo;
  return Promise.all([
    createHash(userInfo),
    creatToken(),
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
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        return reject(err);
      }
      query = client
        .query('select email from users where email=$1', [email])
        .then((result) => {
          if (result.rowCount == 0) {
            return resolve();
          } else {
            return reject({ err, msg: 'You already registerd' });
          }
        });
    });
  });
};
const checkUserName = (userName) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        return reject(err);
      }
      query = client
        .query('select userName from users where userName=$1', [userName])
        .then((result) => {
          if (result.rowCount == 0) {
            return resolve();
          } else {
            return reject({ err, msg: 'You already registerd' });
          }
        });
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
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        return reject({
          err,
          msg: 'Something happened while saving user data into database',
        });
      }
      client.query(
        `insert into users
      (title, firstName, surName, userName, token, email, password, avatar, aboutUser, uuid)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
        ]
      );
      return resolve(data, userInfo);
    });
  });
};

const sendEmail = (data, userInfo) => {
  const { token } = data;
  const { title, firstName, surName, email, avatar, aboutUser } = userInfo;
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

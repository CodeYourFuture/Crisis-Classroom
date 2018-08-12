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
        msg: `Success! Thank you for your patience.`,
      });
    })
    .catch((data) => {
      const { err, msg } = data;
      res.status(200).json({ msg, err });
    });
};

const security = (userInfo) => {
  const { email, user_name } = userInfo;
  return Promise.all([
    creatToken(),
    createHash(userInfo),
    checkEmail(email),
    checkuser_name(user_name),
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
        done()
    });
  });
};
const checkuser_name = (user_name) => {
  return new Promise((resolve, reject) => {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        return reject(err);
      }
      query = client
        .query('select user_name from users where user_name=$1', [user_name])
        .then((result) => {
          if (result.rowCount == 0) {
            return resolve();
          } else {
            return reject({ err, msg: 'You already registerd' });
          }
        });
        done()
    });
  });
};

const saveUserData = (data, userInfo) => {
  const { token, hash } = data;
  const {
    title,
    first_name,
    sur_name,
    user_name,
    email,
    avatar,
    about_user,
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
      (title, first_name, sur_name, user_name, token, email, password, avatar, about_user, uuid)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          title,
          first_name,
          sur_name,
          user_name,
          token,
          email,
          hash,
          avatar,
          about_user,
          uuid,
        ]
      );
      done()
      return resolve(data, userInfo);
    });
  });
};

const sendEmail = (data, userInfo) => {
  const { token } = data;
  const { title, first_name, sur_name, email, avatar, about_user } = userInfo;
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
      text: ` https://crisis-classroom.codeyourfuture.io/accept-registration/${token}`,
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

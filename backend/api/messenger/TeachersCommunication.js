var nodemailer = require("nodemailer");

const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const TeachersCommunication = (req, res) => {
  const messageData = req.body;
  getTeachers(messageData)
    .then(data => sendMessage(data, messageData))
    .then(() => res.json({ msg: "Success!", messageSent: true }))
    .catch(err => {
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      });
    });
};

const getTeachers = messageData => {
  const { userId, toUserId } = messageData;
  return Promise.all([getUser(userId), getToUser(toUserId)]).then(
    ([user, to_user]) => {
      return {
        user,
        to_user
      };
    }
  );
};
getUser = userId => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Ops! Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(
            `select id, title, first_name, sur_name, email from users where id=$1 `,
            [userId]
          )
          .then(result => {
            if (result) {
              return resolve(result.rows[0]);
            } else return reject();
          });
        done();
      }
    );
  });
};
getToUser = toUserId => {
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Ops! Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(
            `select id, title, first_name, sur_name, email from users where id=$1 `,
            [toUserId]
          )
          .then(result => {
            if (result) {
              return resolve(result.rows[0]);
            } else return reject();
          });
        done();
      }
    );
  });
};

const sendMessage = (data, messageData) => {
  return Promise.all([
    sendEmail(data, messageData),
    sendToMessenger(data, messageData)
  ]).then(() => {
    return;
  });
};

sendEmail = (data, messageData) => {
  const { message, send_to_email } = messageData;
  const to_user = data.to_user;
  const user = data.user;
  return new Promise((resolve, reject) => {
    if (send_to_email) {
      var smtpTransport = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER_NAME,
          pass: process.env.SMTP_PASS
        }
      });
      var mailOptions = {
        to: to_user.email,
        from: process.env.USER_GMAIL,
        subject: `Crisis ClassRoom Communication`,
        text: ` Message from ${user.title} ${user.sur_name}\n\n\n
      Message: ${message}`
      };
      smtpTransport.sendMail(mailOptions, err => {
        if (err) {
          return reject();
        }
        return resolve();
      });
    } else return resolve();
  });
};
sendToMessenger = (data, messageData) => {
  const { user, to_user } = data;
  const { time, message, date_id } = messageData;
  return new Promise((resolve, reject) => {
    pg.connect(
      connectionString,
      (err, client, done) => {
        if (err) {
          return reject({
            msg:
              "Ops! Sorry something happened on the server, please try again later."
          });
        }
        client
          .query(
            `insert into crisis_messenger
        (user_id, to_user_id, message, date_id, time)
        values ($1, $2, $3, $4, $5)`,
            [user.id, to_user.id, message, date_id, time]
          )
          .then(() => {
            return resolve();
          });
        done();
      }
    );
  });
};
module.exports = TeachersCommunication;

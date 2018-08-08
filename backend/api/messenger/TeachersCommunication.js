var nodemailer = require("nodemailer");

const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const TeachersCommunication = (req, res) => {
  const data = req.body;
  const { messege, send_to_email } = data;
  getTeachers(data)
    .then(data => sendMessege(data, messege, send_to_email))
    .then(() => res.json({ msg: "Success!" }))
    .catch(err => {
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      });
    });
};

const getTeachers = data => {
  const { senderId, receiverId } = data;
  return Promise.all([getSender(senderId), getReceiver(receiverId)]).then(
    ([sender, receiver]) => {
      return {
        sender,
        receiver
      };
    }
  );
};
getSender = senderId => {
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
            [senderId]
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
getReceiver = receiverId => {
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
            [receiverId]
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

const sendMessege = (data, messege, send_to_email) => {
  return Promise.all([
    sendEmail(data, messege, send_to_email),
    sendToMessenger(data, messege)
  ]).then(() => {
    return;
  });
};

sendEmail = (data, messege, send_to_email) => {
  const receiver = data.receiver;
  const sender = data.sender;
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
        to: receiver.email,
        from: process.env.USER_GMAIL,
        subject: `Crisis ClassRoom Communication`,
        text: ` Messege from ${sender.title} ${sender.sur_name}\n\n\n
      Messege: ${messege}`
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
sendToMessenger = (data, messege) => {
  const date_id = Date.now().toString();
  const receiver = data.receiver;
  const sender = data.sender;
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
            `insert into crisi_messenger
        (sender_id, receiver_id, messege, date_id)
        values ($1, $2, $3, $4)`,
            [sender.id, receiver.id, messege, date_id]
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

var nodemailer = require("nodemailer");

const pg = require("pg");

const connectionString = process.env.DATABASE_URL;

const TeachersCommunication = (req, res) => {
  const data = req.body;
  const { messege } = data;
  console.log(messege);
  getTeachers(data)
    .then(data => sendMessege(data, messege))
    .then(() => res.json({ msg: "Success! Your messege has been sent." }))
    .catch(err => {
      res.status(400).json({
        err,
        msg:
          "Ops! Sorry something happened on the server, please try again later."
      });
    });
};

const getTeachers = data => {
  const { senderId, resiverId } = data;
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
            `select id, title, first_name, sur_name, email from users where id=$1 or id=$2`,
            [senderId, resiverId]
          )
          .then(result => {
            if (result) {
              return resolve(result.rows);
            } else return reject();
          });
        done();
      }
    );
  });
};
sendMessege = (data, messege) => {
  const sender = data[0];
  const resiver = data[1];
  return new Promise((resolve, reject) => {
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
      to: resiver.email,
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
  });
};
module.exports = TeachersCommunication;

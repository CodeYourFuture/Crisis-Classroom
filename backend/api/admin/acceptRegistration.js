var async = require ('async');
var nodemailer = require ('nodemailer');

const sqlite3 = require ('sqlite3').verbose ();

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database (filename);

const AcceptRegistration = (req, res) => {
    const {teacher, admin, userName} = req.body;
  async.waterfall (
    [
      done => {
        var sql = `UPDATE users set teacher=?, admin=? where userName=?`;
        db.run (sql, [teacher, admin, userName], (err) => {
          if (err) {
            return res.status (400).json ({
              msg: 'Ops! Sorry something happened on the server, please try again later.',
            });
          } 
          done (err);
        });
      },
      () => {
        var smtpTransport = nodemailer.createTransport ({
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
          from: process.env.USER_GMAIL,
          subject: 'User update it',
          text: 'Hello,\n\n' +
          'You have update this usre  ' +
          userName +
          ' if it was not you please check',
        };
        smtpTransport.sendMail (mailOptions, err => {
          if (err) {
            return res.status (400).json ({
              msg: 'Ops! Sorry something happened on the server, please try again later.',
            });
          }
          return res.send (`Success! Your changes has been saved.`);
        });
      },
    ],
    err => {
      if (err) {
        return res.status (400).json ({
          msg: 'Ops! Sorry something happened on the server, please try again later.',
        });
      }
    }
  );
};

module.exports = AcceptRegistration;

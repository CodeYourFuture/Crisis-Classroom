var async = require('async');
var nodemailer = require('nodemailer');

const pg = require('pg');

const connectionString = process.env.DATABASE_URL;

const AcceptRegistration = (req, res) => {
  const { teacher, admin, user_name } = req.body;
  async.waterfall(
    [
      (done) => {
        pg.connect(connectionString, (err, client, done) => {
          if (err) {
            return res.status(400).json({
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
          }
          client.query(
            `UPDATE users set teacher=$1, admin=$2 where user_name=$3`,
            [teacher, admin, user_name]
          );  

        });
        done()
      },
      () => {
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
          from: process.env.USER_GMAIL,
          subject: 'User update it',
          text:
            'Hello,\n\n' +
            'You have update this usre  ' +
            user_name +
            ' if it was not you please check',
        };
        smtpTransport.sendMail(mailOptions, (err) => {
          if (err) {
            return res.status(400).json({
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
          }
          return res.send(`Success! Your changes has been saved.`);
        });
      },
    ],
    (err) => {
      if (err) {
        return res.status(400).json({
          msg:
            'Ops! Sorry something happened on the server, please try again later.',
        });
      }
    }
  );
};

module.exports = AcceptRegistration;

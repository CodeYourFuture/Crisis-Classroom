var async = require('async');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const ResetPassword = (req, res) => {
  const { token, password } = req.body;
  pg.connect(connectionString, (err, client, done) => {
    if (err) {
      return res.status(400).json({
        msg:
          'Ops! Sorry something happened on the server, please try again later.',
      });
    }
    client
      .query(`select email, token, token_expires from users where token=$1`, [
        token,
      ])
      .then((result) => {
        if (result) {
          const user = result.rows[0];
          if (err) {
            return res.status(400).json({
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
          } else if (Date.now() > user.token_expires) {
            return res.send('Sorry this link is expired');
          } else {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                return res.status(400).json({
                  msg:
                    'Ops! Sorry something happened on the server, please try again later.',
                });
              }
                client
                  .query(
                    `UPDATE users set password=$1, token_expires=$2 where token=$3`,
                    [hash, Date.now(), user.token]
                  )
                  .then((result) => {
                    if (result) {
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
                        to: user.email,
                        from: process.env.USER_GMAIL,
                        subject: 'Your password has been changed',
                        text:
                          'Hello,\n\n' +
                          'This is a confirmation that the password for your account ' +
                          user.email +
                          ' has just been changed.\n',
                      };
                      smtpTransport.sendMail(mailOptions, (err) => {
                        if (err) {
                          return res.status(400).json({
                            msg:
                              'Ops! Sorry something happened on the server, please try again later.',
                          });
                        }
                        return res.send(
                          `Success! Your password has been changed.`
                        );
                      });
                    }
                  });
            });
          }
        }
      });
      done()
  });
};

module.exports = ResetPassword;

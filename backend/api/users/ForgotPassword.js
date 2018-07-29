var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const ForgotPassword = (req, res, next) => {
  async.waterfall(
    [
      (done) => {
        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString('hex');
          done(err, token);
        });
      },

      (token, done) => {
        pg.connect(connectionString, (err, client, done) => {
          if (err) {
            return res.status(400).json({
              msg:
                'Ops! Sorry something happened on the server, please try again later.',
            });
          }
          client
            .query(`select email from users where email=$1`, [req.body.email])
            .then((result) => {
              if (result) {
                const user = result.rows[0];
                if (result.rowCount == 0) {
                  return res.send('No account with that email address exists.');
                } else if (err) {
                  return res.status(400).json({
                    msg:
                      'Ops! Sorry something happened on the server, please try again later.',
                  });
                } else {
                  const token_expires = Date.now() + 60 * 60 * 1000; //one hour from now
                    if (err) {
                      return res.status(400).json({
                        msg:
                          'Ops! Sorry something happened on the server, please try again later.',
                      });
                    }
                    client
                      .query(
                        `UPDATE users set token=$1, token_expires=$2 where email=$3`,
                        [token, token_expires, user.email]
                      )
                      .then((result) => {
                        if (result.rowCount == 1) {
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
                            subject: 'Password Reset',
                            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n
                                http://localhost:3000/reset-password/${token}\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
                          };
                          smtpTransport.sendMail(mailOptions, (err) => {
                            if (err) {
                              return res.status(400).json({
                                msg:
                                  'Ops! Sorry something happened on the server, please try again later.',
                              });
                            }
                            return res.send(
                              `success, An e-mail has been sent to ${user.email} with further instructions.`
                            );
                          });
                        } else
                          return res.status(400).json({
                            err,
                            msg:
                              'Ops! Sorry something happened on the server, please try again later.',
                          });
                      });
                }
              }
            });
            done()
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

module.exports = ForgotPassword;

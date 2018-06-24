const sqlite3 = require ('sqlite3').verbose ();
const bcrypt = require ('bcrypt');
const crypto = require ('crypto');
var async = require ('async');
var nodemailer = require('nodemailer');

const filename = './database/crisisdb.sqlit';
let db = new sqlite3.Database (filename);

const register = (req, res) => {
  const {
    firstName,
    surName,
    userName,
    email,
    password,
    confirmPassword,
  } = req.body;
  async.waterfall (
    [
      done => {
        crypto.randomBytes (20, (err, buf) => {
          var token = buf.toString ('hex');
          done (err, token);
        });
      },
      (token, done) => {
        if (password === confirmPassword) {
          bcrypt.hash (password, 10, (err, hash) => {
            if (err) {
              return res.status (400).json ({
                msg: `Ops! Sorry something happened on the server, please try again later.`,
              });
            } else {
              var sql = `insert into users
              (firstName, surName, userName, resetPasswordToken, email, password)
              values (?, ?, ?, ?, ?, ?)`;
              db.run (
                sql,
                [firstName, surName, userName, token, email, hash],
                (err, rows) => {  
                  if (err) {
                    return res.status (400).json ({
                      msg: `Ops! Sorry something happened on the server, please try again later.`,
                    });
                  } else {
                    done(err, token, rows);
                  }
                }
              );
            }
          });
        }
      },
      (token, rows) => {
        var smtpTransport = nodemailer.createTransport ({
          service: 'Gmail',
          auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.GMAIL_PASS,
          },
        });
        var mailOptions = {
          to: process.env.USER_GMAIL,
          from: process.env.USER_GMAIL,
          subject: 'Password Reset',
          text: ` http://localhost:3000/accept-registration/${token}`
        };
        smtpTransport.sendMail (mailOptions, err => {
          if (err) {
            return res.status (400).json ({
              msg: 'Ops! Sorry something happened on the server, please try again later.',
            });
          }
          res.status (200).json ({
            rows,
            msg: `Success! Thank you for registrating. We will be in touch shortly by 
             email to welcome you to Crisis Classroom.`
          });
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

module.exports = register;
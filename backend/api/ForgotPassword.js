var passport = require("passport");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);
var gmail = require("../gmail.json");

const ForgotPassword = (req, res, next) => {
  async.waterfall(
    [
      done => {
        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString("hex");
          done(err, token);
        });
      },

      (token, done) => {
        var sql = "select users.email from users where  email=?";
        db.all(sql, req.body.email, (err, rows) => {
          const [user] = rows;
          if (!user) {
            return res.send("No account with that email address exists.");
          } else {
            const resetPasswordExpires = Date.now() + 3600000;
            var sql = `UPDATE users set resetPasswordToken=?, resetPasswordExpires=? where email=?`;
            db.run(sql, [token, resetPasswordExpires, user.email], err => {
              done(err, token, user);
            });
          }
        });
      },
      (token, user, done) => {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.GMAIL_PASS
          }
        });
        var mailOptions = {
          to: user.email,
          from: process.env.USER_GMAIL,
          subject: "Password Reset",
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n
              http://localhost:3000/reset-password/${token}\nIf you did not request this, please ignore this email and your password will remain unchanged.`
        };
        smtpTransport.sendMail(mailOptions, err => {
          if (err) {
            return res.status(400).json({ msg: "Ops! Sorry something happened on the server, please try again later." });
          }
          return res.send(
            `success, An e-mail has been sent to ${
              user.email
            } with further instructions.`
          );
          done(err, "done");
        });
      }
    ],
    err => {
      if (err) {
        res.send(err);
      }
      res.json(res);
    }
  );
};

module.exports = ForgotPassword;

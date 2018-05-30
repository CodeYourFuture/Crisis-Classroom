var passport = require("passport");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const ResetPassword = (req, res) => {
  console.log(req.body);
  async.waterfall(
    [
      done => {
        const { resetPasswordToken, password, confirmPassword } = req.body;
        var sql =
          "select email, resetPasswordToken, resetPasswordExpires from users where resetPasswordToken=?";
        db.all(sql, [resetPasswordToken], (err, rows) => {
          const [user] = rows;
          if (err) {
            res.status(400).json(err);
          } else if (Date.now() > user.resetPasswordExpires) {
            return res.send("Sorry this link is expired");
          } else {
            var sql = `UPDATE users set password=?, confirmPassword=? where resetPasswordToken=?`;
            db.run(
              sql,
              [password, confirmPassword, user.resetPasswordToken],
              err => {
                done(err, user);
              }
            );
          }
        });
      },
      (user, done) => {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "mohsen06111990@gmail.com",
            pass: "pass"
          }
        });
        var mailOptions = {
          to: user.email,
          from: "mohsen06111990@gmail.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        };
        smtpTransport.sendMail(mailOptions, err => {
          if (err) {
          return  res.send(err);
          }
       return   res.send(`Success! Your password has been changed.`);
          done(err, "done");
        });
      }
    ],
    err => {
      if (err) {
       return res.send(err);
      }
    return  res.json(res);
    }
  );
};

module.exports = ResetPassword;

var passport = require("passport");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

const sqlite3 = require("sqlite3").verbose();

const filename = "./database/crisisdb.sqlit";
let db = new sqlite3.Database(filename);

const ForgotPassword = (req, res, next) => {
  console.log(req.body);

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
            user: "mohsen06111990@gmail.com",
            pass: "Moradi66"
          }
        });
        var mailOptions = {
          to: user.email,
          from: "mohsen06111990@gmail.com",
          subject: "Node.js Password Reset",
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n
              http://localhost:3000/reset-password/${token}\nIf you did not request this, please ignore this email and your password will remain unchanged.`
        };
        smtpTransport.sendMail(mailOptions, err => {
          if (err) {
            return res.send(err);
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
// async.waterfall = () => {
//     creatToken()
//       .then(token => sendEmail(token))
//       .then(() => res.json(console.log(res)))
//       .catch(err => res.status(400).json(err));
//   };

//   const creatToken = () => {
//     console.log("hi")
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(20, (err, buf) => {
//       var token = buf.toString("hex");
//       if (err) return reject(err);
//       return resolve(token);
//     });
//   });
// };

// const sendEmail = token => {
//   return new Promise((resolve, reject) => {
//     var smtpTransport = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: "mohsen06111990@gmail.com",
//         pass: "Moradi66"
//       }
//     });
//     var mailOptions = {
//       to: req.body.email,
//       from: "mohsen06111990@gmail.com",
//       subject: "Password Reset",
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n
//               http://localhost:3000/reset-password/${token}\nIf you did not request this, please ignore this email and your password will remain unchanged.`
//     };
//     smtpTransport.sendMail(mailOptions, err => {
//       console.log("mail sent");
//       if (err) return reject(err);
//       return resolve(
//         `success, An e-mail has been sent to ${
//           req.body.email
//         } + with further instructions.`
//       );
//     });
//   });
// };

var passport = require("passport");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

const ResetPassword = (req, res) => {
  console.log(req.body)
  // async.waterfall(
  //   [
  //     done => {
  //       var sql =
  //         "select resetPasswordToken, resetPasswordExpires from users where resetPasswordToken=?";
  //       db.all(sql, [token], (err, rows) => {
  //         const [user] = rows;
  //         if (err) {
  //           res.status(400).json(err);
  //         } else if (Date.now() > user.resetPasswordExpires) {
  //           return res.send("Sorry this link is expired");
  //         } else {
  //           var sql = `UPDATE users set password=?, confirmPassword=? where resetPasswordToken=?`;
  //           db.run(sql, [token, resetPasswordExpires, user.email], err => {
  //             done(err, token, user);
  //           });
  //         }
  //       });

        // User.findOne(
        //   {
        //     resetPasswordToken: req.params.token,
        //     resetPasswordExpires: { $gt: Date.now() }
        //   },
        //   (err, user)=> {
        //     if (!user) {
        //       req.flash(
        //         "error",
        //         "Password reset token is invalid or has expired."
        //       );
        //       return res.redirect("back");
        //     }
        //     if (req.body.password === req.body.confirm) {
        //       user.setPassword(req.body.password, function(err) {
        //         user.resetPasswordToken = undefined;
        //         user.resetPasswordExpires = undefined;

        //         user.save(function(err) {
        //           req.logIn(user, function(err) {
        //             done(err, user);
        //           });
        //         });
        //       });
        //     } else {
        //       req.flash("error", "Passwords do not match.");
        //       return res.redirect("back");
        //     }
        //   }
        // );
  //     },
  //     function(user, done) {
  //       var smtpTransport = nodemailer.createTransport({
  //         service: "Gmail",
  //         auth: {
  //           user: "learntocodeinfo@gmail.com",
  //           pass: process.env.GMAILPW
  //         }
  //       });
  //       var mailOptions = {
  //         to: user.email,
  //         from: "learntocodeinfo@mail.com",
  //         subject: "Your password has been changed",
  //         text:
  //           "Hello,\n\n" +
  //           "This is a confirmation that the password for your account " +
  //           user.email +
  //           " has just been changed.\n"
  //       };
  //       smtpTransport.sendMail(mailOptions, function(err) {
  //         req.flash("success", "Success! Your password has been changed.");
  //         done(err);
  //       });
  //     }
  //   ],
  //   function(err) {
  //     res.redirect("/campgrounds");
  //   }
  // );
};

module.exports = ResetPassword;

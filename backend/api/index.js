const express = require ('express');
const multer = require ('multer');

const storage = multer.diskStorage ({
  destination: './files',
  filename (req, file, cb) {
    cb (null, `${new Date ()}-${file.originalname}`);
  },
});

const upload = multer ({storage});

const logIn = require ('./logIn');
const lessons = require ('./lessons');
const checkUserName = require ('./checkUserName');
const checkEmail = require ('./checkEmail');
const register = require ('./register');
const survey = require ('./survey');
const files = require ('./files');
const creatLessons = require ('./creatLessons');
const EditLesson = require ('./EditLesson');
const DeleteLesson = require ('./DeleteLesson');
//forgot password
const ForgotPassword = require ('./ForgotPassword');
const CheckUserToken = require ('./CheckUserToken');
const ResetPassword = require ('./ResetPassword');
//Admin
const CheckRegistrationToken = require ('./CheckRegistrationToken');
const AcceptRegistration = require ('./acceptRegistration');
const UsersInfo = require ('./usersInfo');
const Selectuser = require ('./SelectUser');
const Admin = require ('./admin');

const api = () => {
  const router = express.Router ();
  router.post ('/register', register);
  router.get ('/lessons', lessons);
  router.post ('/login', logIn.login);
  router.post ('/check-email', checkEmail);
  router.post ('/check-user-name', checkUserName);
  router.post ('/survey', survey);
  router.post ('/creat-lessons', creatLessons);
  router.post ('/edit-lessons', EditLesson);
  router.post ('/delete-lessons', DeleteLesson);
  router.post ('/files', upload.single ('file'), files);
  //forgot password
  router.post ('/forgot-password', ForgotPassword);
  router.get ('/reset-password/:token', CheckUserToken);
  router.post ('/reset-password', ResetPassword);
  //Admin
  router.get ('/accept-registration/:token', CheckRegistrationToken);
  router.post ('/accept-registration', AcceptRegistration);
  router.post ('/users-info', UsersInfo);
  router.post ('/users-info/:id', Selectuser);
  router.post ('/admin', Admin);

  return router;
};

module.exports = api;

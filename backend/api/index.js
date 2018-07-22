const express = require('express');
const multer = require('multer');

const upload = require('../helpers/imageUploader');
const logIn = require('./users/logIn');
const lessons = require('./lesson/lessons');
const checkUserName = require('../helpers/checkUserName');
const checkEmail = require('../helpers/checkEmail');
const register = require('./users/register');
const files = require('./files');
const creatLessons = require('./lesson/creatLessons');
const EditLesson = require('./lesson/EditLesson');
const DeleteLesson = require('./lesson/DeleteLesson');
const UserProfil = require('./users/userProfile');
const CreatSkill = require('./users/creatSkill');
const getSkill = require('./users/getSkill');
const EditSkill=require('./users/editSkill')
const DeleteSkill=require('./users/deleteSkill')
//forgot password
const ForgotPassword = require('./users/ForgotPassword');
const CheckUserToken = require('../helpers/CheckUserToken');
const ResetPassword = require('./users/ResetPassword');
//Admin
const CheckRegistrationToken = require('../helpers/CheckRegistrationToken');
const AcceptRegistration = require('./admin/acceptRegistration');
const UsersInfo = require('./admin/usersInfo');
const Selectuser = require('./admin/SelectUser');
const Admin = require('./admin/admin');

const api = () => {
  const router = express.Router();
  router.post('/register', register);
  router.get('/lessons', lessons);
  router.post('/login', logIn.login);
  router.post('/check-email', checkEmail);
  router.post('/check-user-name', checkUserName);
  router.post('/creat-lessons', creatLessons);
  router.post('/edit-lessons', EditLesson);
  router.post('/delete-lessons', DeleteLesson);
  router.post('/user-profile', UserProfil);
  router.post('/creat-skill', CreatSkill);
  router.post('/edit-skill/:id', getSkill);
  router.post('/edit-skill', EditSkill);
  router.post('/delete-skill', DeleteSkill);
  router.post('/files', upload.single('image'), files);

  //forgot password
  router.post('/forgot-password', ForgotPassword);
  router.get('/reset-password/:token', CheckUserToken);
  router.post('/reset-password', ResetPassword);
  //Admin
  router.get('/accept-registration/:token', CheckRegistrationToken);
  router.post('/accept-registration', AcceptRegistration);
  router.post('/users-info', UsersInfo);
  router.post('/users-info/:id', Selectuser);
  router.post('/admin', Admin);

  return router;
};

module.exports = api;

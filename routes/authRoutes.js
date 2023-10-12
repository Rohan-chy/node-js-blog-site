const { renderRegister, renderLogin, createRegister, login, logOut, forgotPassword, setForgotPassword, renderVerifyOtp, handleVerifyOtp, renderChangePassword, handlePasswordChange } = require('../controller/auth/authController');
const { authCreate } = require('../middleware/authCreate');
const errorHandling = require('../services/errorHandling');


const Router=require('express').Router();

Router.route('/register').get(errorHandling(renderRegister)).post(errorHandling(createRegister))
Router.route('/login').get(errorHandling(renderLogin)).post(errorHandling(login))
Router.route('/logout').get(errorHandling(authCreate),errorHandling(logOut))
Router.route('/forgotPassword').get(errorHandling(forgotPassword)).post(errorHandling(setForgotPassword))
Router.route('/otp').get(errorHandling(renderVerifyOtp))
Router.route('/otp/:id').post(errorHandling(handleVerifyOtp))
Router.route('/changePassword').get(errorHandling(renderChangePassword))
Router.route('/passwordChange/:email/:otp').post(errorHandling(handlePasswordChange))


module.exports=Router;
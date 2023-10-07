const { renderRegister, renderLogin, createRegister, login, logOut, forgotPassword, setForgotPassword, renderVerifyOtp, handleVerifyOtp, renderChangePassword } = require('../controller/auth/authController');
const { authCreate } = require('../middleware/authCreate');


const Router=require('express').Router();

Router.route('/register').get(renderRegister).post(createRegister)
Router.route('/login').get(renderLogin).post(login)
Router.route('/logout').get(authCreate,logOut)
Router.route('/forgotPassword').get(forgotPassword).post(setForgotPassword)
Router.route('/otp').get(renderVerifyOtp)
Router.route('/otp/:id').post(handleVerifyOtp)
Router.route('/changePassword').get(renderChangePassword)


module.exports=Router;
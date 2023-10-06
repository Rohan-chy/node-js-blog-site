const { renderRegister, renderLogin, createRegister, login, logOut, forgotPassword, setForgotPassword } = require('../controller/auth/authController');
const { authCreate } = require('../middleware/authCreate');


const Router=require('express').Router();

Router.route('/register').get(renderRegister).post(createRegister)
Router.route('/login').get(renderLogin).post(login)
Router.route('/logout').get(authCreate,logOut)
Router.route('/forgotPassword').get(forgotPassword).post(setForgotPassword)


module.exports=Router;
const { renderRegister, renderLogin, createRegister, login } = require('../controller/auth/authController');

const Router=require('express').Router();

Router.route('/register').get(renderRegister).post(createRegister)
Router.route('/login').get(renderLogin).post(login)


module.exports=Router;
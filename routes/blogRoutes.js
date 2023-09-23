const { renderAllblog, rendercreateBlog, createBlog, renderSingle, deleteBlog, renderEdit, editBlog } = require('../controller/blog/blogController');

const Router=require('express').Router();

Router.route('/').get(renderAllblog);
Router.route('/createBlog').get(rendercreateBlog).post(createBlog);
Router.route('/single/:id').get(renderSingle)
Router.route('/delete/:id').get(deleteBlog)
Router.route('/edit/:id').get(renderEdit)
Router.route('/editblog/:id').post(editBlog)


module.exports=Router;
const { renderAllblog, rendercreateBlog, createBlog, renderSingle, deleteBlog, renderEdit, editBlog, myBlogs } = require('../controller/blog/blogController');
const { authCreate } = require('../middleware/authCreate');

const { multer, storage } = require("../middleware/multerConfig");
const { validUser } = require('../middleware/validUser');
const errorHandling = require('../services/errorHandling');
const upload = multer({ storage: storage });

const Router=require('express').Router();

Router.route('/').get(renderAllblog);
Router.route('/createBlog').get(errorHandling(rendercreateBlog),errorHandling(authCreate)).post(errorHandling(authCreate),upload.single('image'),errorHandling(createBlog));
Router.route('/single/:id').get(errorHandling(renderSingle))
Router.route('/delete/:id').get(errorHandling(authCreate),errorHandling(validUser),errorHandling(deleteBlog))
Router.route('/edit/:id').get(errorHandling(authCreate),errorHandling(renderEdit))
Router.route('/editblog/:id').post(errorHandling(authCreate),errorHandling(validUser),upload.single('image'),errorHandling(editBlog))
Router.route("/myBlog").get(errorHandling(authCreate),errorHandling(myBlogs))



module.exports=Router;
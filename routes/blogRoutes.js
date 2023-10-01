const { renderAllblog, rendercreateBlog, createBlog, renderSingle, deleteBlog, renderEdit, editBlog, myBlogs, logOut } = require('../controller/blog/blogController');
const { authCreate } = require('../middleware/authCreate');

const { multer, storage } = require("../middleware/multerConfig");
const upload = multer({ storage: storage });

const Router=require('express').Router();

Router.route('/').get(renderAllblog);
Router.route('/createBlog').get(rendercreateBlog,authCreate).post(authCreate,upload.single('image'),createBlog);
Router.route('/single/:id').get(renderSingle)
Router.route('/delete/:id').get(authCreate,deleteBlog)
Router.route('/edit/:id').get(authCreate,renderEdit)
Router.route('/editblog/:id').post(authCreate,editBlog)
Router.route("/myBlog").get(authCreate,myBlogs)
Router.route('/logout').get(logOut)


module.exports=Router;
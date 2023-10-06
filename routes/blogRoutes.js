const { renderAllblog, rendercreateBlog, createBlog, renderSingle, deleteBlog, renderEdit, editBlog, myBlogs } = require('../controller/blog/blogController');
const { authCreate } = require('../middleware/authCreate');

const { multer, storage } = require("../middleware/multerConfig");
const { validUser } = require('../middleware/validUser');
const upload = multer({ storage: storage });

const Router=require('express').Router();

Router.route('/').get(renderAllblog);
Router.route('/createBlog').get(rendercreateBlog,authCreate).post(authCreate,upload.single('image'),createBlog);
Router.route('/single/:id').get(renderSingle)
Router.route('/delete/:id').get(authCreate,validUser,deleteBlog)
Router.route('/edit/:id').get(authCreate,renderEdit)
Router.route('/editblog/:id').post(authCreate,validUser,upload.single('image'),editBlog)
Router.route("/myBlog").get(authCreate,myBlogs)



module.exports=Router;
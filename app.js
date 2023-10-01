const express=require("express") //requiring express package
const app=express() //storing it in app, app variable throughout use garxum
require('dotenv').config()
const cookieParser=require('cookie-parser')


const { blogs }=require("./model/index")
const { renderAllblog, rendercreateBlog, createBlog, renderSingle, deleteBlog, renderEdit, editBlog } = require("./controller/blog/blogController")


//database connection
require("./model/index")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("uploads/"))

app.use(cookieParser());

app.use((req,res,next)=>{
    // res.locals.presentUser=req.cookies.token;
    res.locals.presentUser=req.cookies.token;
    next()
})

const route=require('./routes/blogRoutes')
app.use('',route)

const authRouter=require('./routes/authRoutes')
app.use('',authRouter)




app.listen(5000,()=>{
    console.log("node js is started in port 5000");
})
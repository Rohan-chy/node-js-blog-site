const express=require("express") //requiring express package
const app=express() //storing it in app, app variable throughout use garxum


const { blogs }=require("./model/index")
const { renderAllblog, rendercreateBlog, createBlog, renderSingle, deleteBlog, renderEdit, editBlog } = require("./controller/blog/blogController")


//database connection
require("./model/index")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const route=require('./routes/blogRoutes')
app.use('',route)

// app.get("/",renderAllblog)


// app.get("/createBlog",rendercreateBlog)


// app.post("/createBlog",createBlog)

// //day 6 
// app.get("/single/:id",renderSingle)
  
// //day 7 Delete operation
// app.get("/delete/:id",deleteBlog)

// //day 8 update

// app.get("/edit/:id",renderEdit)

// app.post("/editblog/:id",editBlog)

app.listen(5000,()=>{
    console.log("node js is started in port 5000");
})
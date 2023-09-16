const express=require("express") //requiring express package
const app=express() //storing it in app, app variable throughout use garxum


const { blogs }=require("./model/index")


//database connection
// require("./model/index")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",async(request,response)=>{

    const getData= await blogs.findAll()
    response.render("home",{data:getData})
})


app.get("/createBlog",(req,res)=>{
    res.render("createBlog")
})


app.post("/createBlog",async(req,res)=>{
    // const {title,subtitle,description}=req.body;
    const title=req.body.title;
    const subtitle=req.body.subtitle;
    const description=req.body.description;
    // console.log(req.body)

    await blogs.create({
        title:title,
        subTitle:subtitle,
        description:description
    })
    res.redirect("/")
})

//day 6 
app.get("/single/:id",async(req,res)=>{
    const id=req.params.id

    const getId=await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("oneBlog",{getId:getId})
})
  
//day 7 Delete operation
app.get("/delete/:id",async(req,res)=>{
    const id= req.params.id;

    await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect("/");
})

//day 8 update

app.get("/edit/:id",async(req,res)=>{
    const {id}=req.params;

    const data=await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("update",{data:data})
})

app.post("/editblog/:id",async(req,res)=>{
    const {id}=req.params;

    const {title,subtitle,description}=req.body;

    await blogs.update({
        title:title,
        subTitle:subtitle,
        description:description
    },{
        where:{
            id:id
        }
    })
    res.redirect("/single/"+id); 
})

app.listen(5000,()=>{
    console.log("node js is started in port 5000");
})
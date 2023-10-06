const { blogs, users } = require("../../model")
const fs = require("fs") 

exports.renderAllblog=async(request,response)=>{
    const getData= await blogs.findAll()
    response.render("home",{data:getData})
}

exports.rendercreateBlog=(req,res)=>{
    res.render("createBlog")
}

exports.createBlog=async(req,res)=>{
    const {title,subtitle,description}=req.body;
    const fileName=req.file.filename;
    // console.log(req.file)

    const userId=req.userId;
    
    await blogs.create({
        title:title,
        subTitle:subtitle,
        description:description,
        userId:userId,
        image:process.env.APP_URL + fileName
    })
    res.redirect("/")
}

exports.renderSingle=async(req,res)=>{
    const id=req.params.id

    const getId=await blogs.findAll({
        where:{
            id:id
        },
        include:{
            model:users
        }
    })
    res.render("oneBlog",{getId:getId})
}

exports.deleteBlog=async(req,res)=>{
    const id= req.params.id;

    const existData=await blogs.findAll({
        where:{
            id:id
        }
    })
    const imageUrl=existData[0].image;
    const finalImageUrl=imageUrl.slice(22);

    fs.unlink(`uploads/${finalImageUrl}`,(error)=>{
        if(error){
            console.log(`image couldnot delete due to ${error}`)
        }
        else{
            console.log("deleted successfully")
        }
    })

    await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect("/");
}

exports.renderEdit=async(req,res)=>{
    const {id}=req.params;

    const data=await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("update",{data:data})
}

exports.editBlog=async(req,res)=>{
    const {id}=req.params;

    const {title,subtitle,description}=req.body;
    const fileName=req.file.filename;
    // console.log(req.file)

    const existData=await blogs.findAll({
        where:{
            id:id
        }
    })

    let fileUrl;
    if(req.file){
        fileUrl=process.env.APP_URL + fileName

        const oldUrl=existData[0].image;
        const finalUrl=oldUrl.slice(22)

        fs.unlink(`uploads/${finalUrl}`,(error)=>{
            if(error){
                console.log(`cannot update due to ${error}`)
            }
            else{
                console.log('updated succesfully')
            }
        })
    }
    else{
        fileUrl=existData[0].image
    }

    await blogs.update({
        title:title,
        subTitle:subtitle,
        description:description,
        image:fileUrl
    },{
        where:{
            id:id
        }
    })
    res.redirect("/single/"+id); 
}

exports.myBlogs=async(req,res)=>{
    const userId=req.userId;
    const userInfo=await blogs.findAll({
        where:{
            userId
        }
    })
    res.render('myBlog',{userInfo})
}


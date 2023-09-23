const { blogs } = require("../../model")

exports.renderAllblog=async(request,response)=>{
    const getData= await blogs.findAll()
    response.render("home",{data:getData})
}

exports.rendercreateBlog=(req,res)=>{
    res.render("createBlog")
}

exports.createBlog=async(req,res)=>{
    const {title,subtitle,description}=req.body;
    
    await blogs.create({
        title:title,
        subTitle:subtitle,
        description:description
    })
    res.redirect("/")
}

exports.renderSingle=async(req,res)=>{
    const id=req.params.id

    const getId=await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render("oneBlog",{getId:getId})
}

exports.deleteBlog=async(req,res)=>{
    const id= req.params.id;

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
}
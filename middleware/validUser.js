const { blogs } = require("../model");

exports.validUser=async(req,res,next)=>{
    const userId=req.userId;
    const id=req.params.id;

    const existData=await blogs.findAll({
        where:{
            id:id
        }
    })

    if(existData[0].userId!==userId){
        return res.send("can not edit blog")
    }

    next()
}
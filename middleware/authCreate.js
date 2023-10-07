const jwt=require('jsonwebtoken');
const { users } = require('../model');
const { decryptToken } = require('../services/decryptToken');


exports.authCreate=async(req,res,next)=>{
    const token=req.cookies.token;

    if(!token){
        return ("please login to create blog")
    }

    //verify the token
    const decryptData=await decryptToken(token,process.env.SECRETKEY);
    // console.log(decryptData);

    const getExistData=await users.findAll({
        where:{
            id:decryptData.id
        }
    })

    if(getExistData.length==0){
        res.send("not valid token")
    }
    else
    {
        req.userId=getExistData[0].id;
        next();
    }
    
}
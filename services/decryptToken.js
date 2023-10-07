const promisify=require('util').promisify;
const jwt = require("jsonwebtoken")

exports.decryptToken=async(token,key)=>{
    const decryptToken=await promisify(jwt.verify) (token,key)
    return decryptToken;
}
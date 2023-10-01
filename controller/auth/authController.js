const { users } = require("../../model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.renderRegister=(req,res)=>{
    res.render('register')
}

exports.renderLogin=(req,res)=>{
    res.render('login')
}
exports.createRegister=async(req,res)=>{
    const {email,username,password,confirm_password}=req.body;
    console.log(req.body)

    const getData=await users.findAll({
        where:{
            email:email
        }
    })

    if(password !== confirm_password){
         res.send("password not matched")
    }
    else if(getData.length > 0){
         res.send("already registered")
    }
    else if(!email || !password || !username || !confirm_password){
         res.send('please enter email or password')
    }
    else{
        await users.create({
            email,
            username,
            password:bcrypt.hashSync(password,8)
        })
    }
    res.redirect('/login')
}

exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const forLogin=await users.findAll({
        where:{
            email:email
        }
    })

    if(!email || !password){
        res.send("please enter email or password")
    }
    else if(forLogin.length == 0){
        res.send('email doesnot exist')
    }
    else{
        const passwordCheck=bcrypt.compareSync(password,forLogin[0].password)

        if(passwordCheck){
           const token= jwt.sign({id:forLogin[0].id},process.env.secretKey,{
                expiresIn:'10d'
            })

            res.cookie("token",token)
        
            res.redirect('/')
        }
        else{
            res.send('password not matched')
        }
    }
}

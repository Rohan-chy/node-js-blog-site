const { users } = require("../../model")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const sendEmail = require("../../services/sendOtp")

exports.renderRegister=(req,res)=>{
    res.render('register')
}

exports.renderLogin=(req,res)=>{
    res.render('login')
}
exports.createRegister=async(req,res)=>{
    const {email,username,password,confirm_password}=req.body;

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

exports.logOut=(req,res)=>{
    res.clearCookie('token')
    res.redirect('/login')
}

exports.forgotPassword=(req,res)=>{
    res.render("forgotPassword")
}

exports.setForgotPassword=async(req,res)=>{
    const {email}=req.body;

    if(!email){
        return res.send("please provide email")
    }

    const emailData=await users.findAll({
        where:{
            email:email
        }
    })

    if(emailData==0){
        res.send("email doesnot exist")
    }
    else{
        var randOtp = Math.floor(1000 + Math.random() * 9000);
        await sendEmail({
            email:email,
            subject:"Forgot Password",
            otp:randOtp
        })
        emailData[0].otp=randOtp;
        emailData[0].otpGeneratedTime=Date.now();
        await emailData[0].save()
    }
    res.redirect(`/otp?email=${email}`)

}

exports.renderVerifyOtp=(req,res)=>{
    const {email}=req.query;
    res.render('verifyOtp',{email})
}

exports.handleVerifyOtp=async(req,res)=>{
    const email=req.params.id;
    const otp=req.body.otp;

    if(!email || !otp){
       return res.send('please provide otp')
    }

    const verifyOtpData=await users.findAll({
        where:{
            email,
            otp
        }
    })
    
    if(verifyOtpData.length==0 || otp!==verifyOtpData[0].otp){
        res.send("invalid otp")
    }
    else{
        
            const currentTime=Date.now();
            const pastTime=verifyOtpData[0].otpGeneratedTime;

            if(currentTime-pastTime<=180000){
                res.redirect(`/changePassword?email=${email}&otp=${otp}`)
            }
            else{
                res.send('otp expired')
            }
        
        
    }
}

exports.renderChangePassword=(req,res)=>{
    const email=req.query.email;
    const otp=req.query.otp;
    if(!email || !otp){
        return res.redirect('/forgotPassword')
    }
    res.render('changePassword',{email,otp})
}

exports.handlePasswordChange=async(req,res)=>{
    const email=req.params.email;
    const otp=req.params.otp;
    const {newpassword,newconfirm_password}=req.body;


    if(!email || !otp){
        
       return res.redirect('/changePassword')
    }

    if(!newconfirm_password || !newpassword){
       return res.send("no newpassword found")
    }
    if(newpassword!==newconfirm_password){
         return res.send('password doesnot match')
         
    }

    const passwordChangeData=await users.findAll({
        where:{
            email,
            otp
        }
    })

    if(passwordChangeData.length==0){
        return res.send('no authority to change password')
    }

    const currentTime=Date.now();
    const generatedTime=passwordChangeData[0].otpGeneratedTime;

    if(currentTime-generatedTime >= 300000){
        return res.redirect('/forgotPassword')
    }
    await users.update({
        password:bcrypt.hashSync(newpassword,8)
    },{
        where:{
            email,
            otp
        }
    })

    res.redirect('/login')
}



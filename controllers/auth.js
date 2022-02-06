const User=require('../models/User')
const UserEducation=require('../models/UserEducation')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
var nodemailer = require('nodemailer');
const geocoder=require('../utils/geocoder')

const auth={


//REGISTER USER    
register:async(req,res)=>{
    try{
        //you can add role here for school
        const {fullname,role,email,password,address}=req.body
        
        // let newUserName=username.toLowerCase().replace(/ /g,'')
        //if in future you need to have user name you can have this // 
        
        // //remove this username in your own project
        // const user_name=await User.findOne({username:newUserName})
        // if(user_name) return res.status(400).json({msg:"This username is taken"})
        
        //here you can check for the email id whether it exists or not
        const user_email=await User.findOne({email:email})
        if(user_email) return res.status(400).json({msg:"This emailaddress already exists is taken"})
        
        if(password.length<6)
        {
            return res.status(400).json({msg:"password must be more than 6 characters"})
        
        }
        
        const passwordHash=await bcrypt.hash(password,12)
       
            const loc = await geocoder.geocode(address);
           const  location = {
              type: 'Point',
              coordinates: [loc[0].longitude, loc[0].latitude],
              formattedAddress: loc[0].formattedAddress,
              street: loc[0].streetName,
              city: loc[0].city,
              state: loc[0].stateCode,
              zipcode: loc[0].zipcode,
              country: loc[0].countryCode
            };
          
            // Do not save address in DB
        //creating the account
        const newUser=new User({
            fullname,role:role,email,password:passwordHash,address,location
        })

        // const access_token=createAccessToken({id:newUser._id})
        // const refresh_token=createRefreshToken({id:newUser._id})

        // res.cookie('refreshtoken',refresh_token,{
        //     httpOnly:true,
        //     path:'/api/refresh_token',
        //     maxAge:30*24*60*60*1000 //30 days
        //     //here i am sending the cookies
        // })
        

        await newUser.save()
        const emailtoken= jwt.sign(req.body,process.env.EMAIL_TOKEN,{expiresIn:'1d'})
        const setToken=await User.findOneAndUpdate({email:email},{emailtoken},{new:true})
        var transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD
            }
          });
    
        var mailOptions = {
            from: process.env.SMTP_USER,
            to:email,
            subject: 'Confirmation mail from KidsIn',
            text: process.env.WEBSITE_URL+'confirmtoken'+'/'+emailtoken,
            html:`
            
            <!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }

            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 700;
                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }

        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* MOBILE STYLES */
        @media screen and (max-width:600px) {
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }

        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
</head>

<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Confirm your mail! Get ready to dive into your new account. </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#0089f1" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#0089f1" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Thank You For Registration</h1> <img src=" http://kidsin.org/images/logo.png" width="125" height="120" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#0089f1"><a href="${process.env.WEBSITE_URL+'confirmtoken'+'/'+emailtoken}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #0089f1; display: inline-block;">Confirm Email</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">${process.env.WEBSITE_URL+'confirmtoken'+'/'+emailtoken}</a></p>
                        </td>
                    </tr>
               
                    
                </table>
            </td>
        </tr>
        
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
            
            
            
            
            
            
            
            
            `
          };
    
    
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              
            } else {
              
            }
          });
          res.status(200).json({msg:"Check your email for confirmation link"})
          

        // res.json({
        //     msg:'Account Created Successfully',
        //     access_token,
        //     user:{
        //         ...newUser._doc,
        //         password:''
        //     }
        //     //here i am making the password null so that it is confidential
        // })

    }
    catch(err){
            return res.status(500).json({msg:err.message})
    }
},


//LOGIN 
adminlogin:async(req,res)=>{
    try{
        
        const {email, password}=req.body
        const user=await User.findOne({email}).populate("followers following","-password")
        if(!user) return res.status(400).json({msg:"user does not exists"})
        
        const isMatch=await bcrypt.compare(password,user.password)
        
        if(!isMatch) return res.status(400).json({msg:"Password is incorrect"})
        const education=await UserEducation.find({user:user._id})
        
        if(user.role!="admin")return res.json({msg:"not admin"});
        
        const access_token=createAccessToken({id:user._id})
        const refresh_token=createRefreshToken({id:user._id})
     
            res.cookie('refreshtoken',refresh_token,{
                httpOnly:true,
                path:'/admin/refresh_token',
                maxAge:30*24*60*60*1000 //30 days
                //here i am sending the cookies
            })
       
    
        res.json({
            msg:'Logged in Successfully',
            access_token,
            user:{
                ...user._doc,
                password:''
            },
            details:{
                education
            }
            //here i am making the password null so that it is confidential

        })





    }
    catch(err){
            return res.status(500).json({msg:err.message})
    }
},



//LOGIN 
login:async(req,res)=>{
    try{
        const {email, password}=req.body
        const user=await User.findOne({email}).populate("followers following","-password")
        if(!user) return res.status(400).json({msg:"user does not exists"})
        if(user.emailconfirmed==false) return res.status(400).json({msg:"please confirm your email"})

        
        const isMatch=await bcrypt.compare(password,user.password)
        
        if(!isMatch) return res.status(400).json({msg:"Password is incorrect"})
        const education=await UserEducation.find({user:user._id})
     
        
        const access_token=createAccessToken({id:user._id})
        const refresh_token=createRefreshToken({id:user._id})
     

            res.cookie('refreshtoken',refresh_token,{
                httpOnly:true,
                path:'/api/refresh_token',
                maxAge:30*24*60*60*1000 //30 days
                //here i am sending the cookies
            })
     
    
        res.json({
            msg:'Logged in Successfully',
            access_token,
            user:{
                ...user._doc,
                password:''
            },
            details:{
                education
            }
            //here i am making the password null so that it is confidential

        })





    }
    catch(err){
            return res.status(500).json({msg:err.message})
    }
},


//LOGOUT USER CLEARING THE COOKIES ON BOTH THE END
logout:async(req,res)=>{
    try{
                res.clearCookie('refreshtoken',{path:'/api/refresh_token'})
                return res.json({msg:"logged out successfully"})
    }
    catch(err){
            return res.status(500).json({msg:err.message})
    }
},


//GENERATING ACCESS TOKEN
generateAccessToken:async(req,res)=>{
    try{
        
                const rf_token=req.cookies.refreshtoken
                if(!rf_token) return res.status(400).json({msg:"please Login"})

                //here i am getting the user by verifying the token
                jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,async(err,result)=>{
                    if(err) return res.status(400).json({msg:"please Login"})
                    

                   const user= await User.findById(result.id).select("-password").populate("followers following interest",'-password')
                   if(!user) return res.status(400).json({msg:"User does not exists"})
                    
                   const access_token=createAccessToken({id:result.id})
                   res.json({access_token,user})
                    
                })
        
    }
    catch(err){
            return res.status(500).json({msg:err.message})
    }
},
resetToken:async(req,res)=>{
    const {values}=req.body
    
    const user=await User.find({email:values.email})
    if(user.length===0) return res.status(400).json({msg:"User does not exists"})
    const token= jwt.sign(values,process.env.EMAIL_TOKEN,{expiresIn:'1d'})
    const setToken=await User.findOneAndUpdate({email:values.email},{resetToken:token},{new:true})
    var transporter = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });

    var mailOptions = {
        from: process.env.SMTP_USER,
        to:values.email,
        subject: 'Sending Email using Node.js',
        text: process.env.WEBSITE_URL+'resetpassword'+'/'+token
      };


      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          
        } else {
          
        }
      });
      res.status(200).json({msg:"Check your email"})
      
    },

resetPassword:async(req,res)=>{
try {
    const user=await User.find({resetToken:req.body.token})
    if(user.length===0)return res.json({msg:'link not working please request new link'})
    const passwordHash=await bcrypt.hash(req.body.password,12)
    const userupdate=await User.findByIdAndUpdate(user[0]._id,{
        password:passwordHash,
        resetToken:undefined
    })
    return res.json({msg:'password changed successfully'})
} catch (err) {
    res.status(400).json({msg:"please try again"})
}
},
confirmEmail:async(req,res)=>{
    

    try {

        const user=await User.find({emailtoken:req.params.id})
        if(user.length===0)return res.status(404).json({msg:'link not working please request new link',status:false})
        const userupdate=await User.findByIdAndUpdate(user[0]._id,{
            emailconfirmed:true,
            emailtoken:undefined
        })
        return res.status(200).json({msg:'email confirmed'})
    } catch (err) {
        
        res.status(400).json({msg:"please try again"})
    }
    },
    emailToken:async(req,res)=>{
    try{
        const {values}=req.body
        
        const emailtoken= jwt.sign(values,process.env.EMAIL_TOKEN,{expiresIn:'1d'})
        const setToken=await User.findOneAndUpdate({email:values.email},{emailtoken},{new:true})
        var transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD
            }
          });
    
        var mailOptions = {
            from: process.env.SMTP_USER,
            to:values.email,
            subject: 'Sending Email using Node.js',
            text: process.env.WEBSITE_URL+'confirmtoken'+'/'+emailtoken
          };
    
    
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              
            } else {
              
            }
          });
          res.status(200).json({msg:"Check your email"})
          
    }
    catch (err) {
        
        res.status(400).json({msg:"please try again"})
    }

    }
}


const createAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})

}

const createRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})

}












module.exports=auth
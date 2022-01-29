const User = require('../models/User');
const UserEducation = require('../models/UserEducation');
const UserSkills=require('../models/UserSkills')
const UserCertification=require('../models/UserCertification')
const Achievements=require('../models/Achievements')
const Connections=require('../models/Connections')
const Event=require('../models/Events')
const Course=require('../models/Courses');
const Posts = require('../models/Posts');
const SchoolData = require('../models/SchoolData')
const Profile = require('../models/Profile')
const Interest = require('../models/InterestModel');
const bcrypt=require('bcrypt')
const geocoder=require('../utils/geocoder')
const Razorpay=require('razorpay');
const shortid = require('shortid');
const Plans = require('../models/Plans');
const purchased = require('../models/purchased');
const Allmessages = require('../models/Allmessages');
const verification = require('../models/verification');
const Createpage = require('../models/Createpage');

const multer = require("multer");
const Studentpost = require('../models/Studentpost');
const upload = multer({ dest: "uploads/" });



const UserController={

userDetails:async(req,res,next)=>{
     try{   
        const id=!req.params.id?req.user._id:req.params.id
        const user=await User.findById(id).populate({path:'courses events followers following courses.participants', populate:{path:'participants'}})
        console.log(user)
        const education=await UserEducation.find({user:id})
        const skill=await UserSkills.find({user:id}).populate('endrosedBy')
        const certification=await UserCertification.find({user:id})
        const Achievement=await Achievements.find({user:id})  
        const events=await Event.find({user:id}).populate('participants')  
        const courses=await Course.find({user:id}).populate('participants') 
        const request=await Connections.find({$and:[{to:req.user._id},{status:0}]}).populate('from')
        const pending=await Connections.find({$and:[{from:req.user._id},{status:0}]}).populate('to')
        const schoolData=await SchoolData.find()
        const profileData=await Profile.find()
        const interestData=await Interest.find()
        const isUserPaid=await purchased.find({purchasedBy:req.user._id})
        let pages
        if(req.user.role==='school'){
            pages=await Createpage.find({createdBy:req.user._id})
        }

      
      //getting all the connections
    //   let connections=await Connections.find({$and:[{$or:[{from:req.user._id},{to:req.user._id}]},{status:1}]}).populate('from').populate('to')
        
    //   const realconnections=[]
    //   const allFriends=(user)=>{
    //     const don=user.from._id===req.user._id?user.to:user.from
    //     const con={...don._doc,card:user._id}
    //     realconnections.push(con)
    //     return con
    //   }
    //   const allConnection=connections.filter(allFriends)
      const realconnections=user.followers
      const allconnections={request,pending,realconnections}

        res.json({
        success:"fetched",
        data:{
        user,
        education,
        skill,
        certification,
        Achievement,
        events,
        courses,
        allconnections,
        schoolData,
        profileData,
        interestData,
        isUserPaid,
        pages

    }})
     }
        catch (err) {
            console.log("here is the world")
            console.log(err)
            return res.status(500).json({msg:err.message})
        }
        },

getUser:async(req,res,next)=>{
            try{   
               const id=!req.params.id?req.user._id:req.params.id
               const user=await User.findById(id).populate('courses events courses.participants')
               const education=await UserEducation.find({user:id})
               const skill=await UserSkills.find({user:id}).populate('endrosedBy')
               const certification=await UserCertification.find({user:id})
               const Achievement=await Achievements.find({user:id})  
               const events=await Event.find({user:id}).populate('participants')  
               const courses=await Course.find({user:id}).populate('participants') 
               const request=await Connections.find({$and:[{to:id},{status:0}]})
            //    const pending=await Connections.find({$and:[{from:id},{status:0}]}).populate('to')
               const isUserPaid=await purchased.find({purchasedBy:req.user._id})

                const post=await Posts.find({user:id}).populate(
                    {
                        path:'user',
                        model:'User',
                        populate:{
                            path:'followers',
                            model:'User',
                        }
                    
                    
                    
                }).populate({
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                })
             
             //getting all the connections
            //  let connections=await Connections.find({$and:[{$or:[{from:id},{to:id}]},{status:1}]}).populate('from').populate('to')
               
            //  const realconnections=[]
            //  const allFriends=(user)=>{
            //    const don=user.from._id===req.params.id?user.to:user.from
            //    don.card=user._id
            //    realconnections.push(don)
            //   return don
            //  }
            //  const allConnection=connections.filter(allFriends)
            let requestpending=[];
            request.filter(user=>requestpending.push(String(user.from)))
            console.log("asdasdsa",requestpending)
            const realconnections=user.followers
            const allconnections={request,realconnections}
            let statusBetween;
            if(user.followers.includes(req.user._id))
            {
                statusBetween="Connected"
            }    
            else if(requestpending.includes(String(req.user._id)))
            {
                statusBetween="Pending"
            }
            res.json({
               success:"fetched",
               data:{
               user,
               education,
               skill,
               certification,
               Achievement,
               events,
               courses,
               allconnections,post,
               statusBetween
           }})
            }
               catch (err) {
                   return res.status(500).json({msg:err.message})
               }
               },
       


//Search
searchUser:async(req,res)=>{
    try {
        const users=await User.find({fullname:{$regex: ".*" + req.query.fullname, $options: "i" }}).limit(10).select("fullname username avatar role")
        res.json({users})
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
},

updateUser:async(req,res)=>{
    
try {
    if(req.body.avatar!=undefined)
    {
   const imagePath=req.body.avatar
    const user=await User.findByIdAndUpdate(req.user._id,{avatar:imagePath})
    
    res.json({msg:"image Uploaded successfully"})
    }
    else{
        const {fullname,dob,mom_name,dad_name,address,mobile,gender}=req.body 
        if(!fullname)return res.status(400).json({msg:"please enter your name"})       
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
const userInfo= await User.findOneAndUpdate({_id:req.user._id},{
            fullname,dob,mom_name,dad_name,address,mobile,location,gender
        })
const user=await User.findById(req.user._id).populate('courses events followers following courses.participants')

        res.json({msg:"Information Updated successfully",user})

        
    }

} catch (err) {
    return res.status(500).json({msg:err.message})

}

},
updateAbout:async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(req.user._id,{about:req.body.about})
        if(!user) return res.status(400).json({msg:'User Does Not exists'})
        res.json({msg:"About Updated successfully"})
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }

},

addEducation:async(req,res)=>{
  try {
// 
// const schooLogo=await Profile.find({$or:[{profile:req.body.school+'.png'},{profile:req.body.school+'.jpg'}]})
// 
const profile=await SchoolData.find({schoolname:req.body.school})
console.log(profile[0].profile)
  const user=await UserEducation.create({
  school:req.body.school,
  profile:profile[0].profile,
  class_start:req.body.class_start,
  class_end:req.body.class_end,
  start_year:req.body.start_year,
  end_year:req.body.end_year,
  user:req.user._id
  })
  const education=await UserEducation.find({user:req.user._id})

    res.json({msg:"education Added successfully",data:education})
} catch (err) {
    return res.status(500).json({msg:err.message})

}

  },

updateEducation:async(req,res)=>{
    try {
        const profile=await SchoolData.find({schoolname:req.body.school})
    console.log(profile[0].profile)
        const user=await UserEducation.findByIdAndUpdate({_id:req.body.id},{
            school:req.body.school,
            profile:profile[0].profile,
            class_start:req.body.class_start,
            class_end:req.body.class_end,
            start_year:req.body.start_year,
            end_year:req.body.end_year,
            user:req.user._id
            })
        const education=await UserEducation.find({user:req.user._id})

            res.json({msg:"education updated successfully",data:education})

    } catch (err) {

            return res.status(500).json({msg:err.message})

    }
},

deleteEducation:async(req,res)=>{
try {

    const user=await UserEducation.deleteOne({_id:req.headers.id})
    const education=await UserEducation.find({user:req.user._id})
    res.json({msg:"education deleted successfully",data:education})


} catch (err) {
        return res.status(500).json({msg:err.message})

}
    
    },


//update skills
updateSkills:async(req,res)=>{
    try {
        const hello=req.body.skill
        if(hello.length<=0) return res.status(500).json({msg:'Please enter skill'})

        const tello=[]
        for(let i of hello)
        {
            tello.push(i)
        }
        
        const user=await User.findById(req.user._id)
        const userskills=await UserSkills.find({user:req.user._id})
        let preskills=[]
        for(let i of userskills)
        {
        preskills.push(i.skill)
        }
        
        let message="";
        for(let i of tello)
        {
           if(preskills.includes(i))
           {
           return res.status(500).json({msg:'Cannot add same skill again'})
        
           }
        else{
        await UserSkills.create({
        user:req.user._id,
        skill:i
        })
        
           }
        
           
        }



        const skills=await UserSkills.find({user:req.user._id}).populate('endrosedBy')

        res.json({msg:"Skills Added",data:skills})
        
        
    } 
    catch (err) {
        return res.status(500).json({msg:err.message})
    }
   
    },
endrosedSkills:async(req,res)=>{
    
try {
    const {skillId}=req.body
    const oneSkill=await UserSkills.findById(skillId)
    if(oneSkill.endrosedBy.includes(req.user._id))
    {
        const remove=await UserSkills.findByIdAndUpdate(skillId,{
            $pull:{endrosedBy:req.user._id}
        },{new:true})
    }
    else{
        const skill=await UserSkills.findByIdAndUpdate(skillId,{
            $push:{endrosedBy:req.user._id}
        },{new:true})
    }

    const skills=await UserSkills.find({user:req.user._id}).populate('endrosedBy')
    res.json({msg:'endrosed skill ',data:skills})

} catch (err) {
    return res.status(500).json({msg:err.message})

}
},
deleteSkills:async(req,res)=>{
try {
    const {id}=req.headers
    const skills=await UserSkills.findByIdAndDelete(id)
    const skill=await UserSkills.find({user:req.user._id})
    res.json({msg:'deleted skill  successfully',data:skill})
} catch (err) {
    return res.status(500).json({msg:err.message})

}
},
addCertificate:async(req,res)=>{
    try {
    const {certificate,details,file}=req.body
    UserCertification.create({
        certificate:certificate,
        details:details,
        user:req.user._id,
        file:file
        
        })
const certification=await UserCertification.find({user:req.user._id})
const certifications=await UserCertification.find({user:req.user._id})
        res.json({msg:"certificate added successfully",data:certifications})

        
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }


},

updateCertificate:async(req,res)=>{
    try {
    const {certificate,details,id,file}=req.body
const user =await UserCertification.findByIdAndUpdate({_id:req.body.id},{
        certificate:certificate,
        details:details,
        user:req.user._id,
        file:file
        
        })
        const certification=await UserCertification.find({user:req.user._id})

        res.json({msg:"certificate updated successfully",data:certification})

        
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }


},

deleteCertificate:async(req,res)=>{
    try {
        const user=await UserCertification.deleteOne({_id:req.headers.id})
        const certification=await UserCertification.find({user:req.user._id})
        res.json({msg:"certificate deleted successfully",data:certification})

        
    } catch (err) {
                return res.status(500).json({msg:err.message})
    }
},



//SEND REQUESTS
sendRequest:async(req,res)=>{
    const connections=await Connections.find({$or:[{$and:[{from:req.user._id},{to:req.body.friendId}]},{$and:[{to:req.user._id},{from:req.body.friendId}]}]})
    if(connections.length!==0) return  res.json({msg:"Cannot send Request Again"})

    const conn=await Connections.create({
    from:req.user._id,
    to:req.body.friendId
    })
    const pending=await Connections.find({$and:[{from:req.user._id},{status:0}]}).populate('to')

    res.json({msg:"Connection request sent ",data:pending})
},
//Accept Request
acceptRequest:async(req,res)=>{
    try {
        const conn=await Connections.findByIdAndUpdate(req.body.conid,{
            status:1
            })
        
        await User.findOneAndUpdate({_id:req.user._id},{
            $push:{following:conn.from}
        },{new:true})

        await User.findOneAndUpdate({_id:conn.from},{
            $push:{following:req.user._id}
        },{new:true})

        await User.findOneAndUpdate({_id:req.user._id},{
            $push:{followers:conn.from}
        },{new:true})

        await User.findOneAndUpdate({_id:conn.from},{
            $push:{followers:req.user._id}
        },{new:true})

        const user=await User.findById(req.user._id).populate('courses events followers following')
        const request=await Connections.find({$and:[{to:req.user._id},{status:0}]}).populate('from')

        res.json({msg:"request accepted",data:user,request:request})
        
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }


},
//
deleteRequest:async(req,res)=>{
    try {
        const conn=await Connections.findByIdAndDelete(req.headers.id)
        const request=await Connections.find({$and:[{to:req.user._id},{status:0}]}).populate('from')
        const pending=await Connections.find({$and:[{from:req.user._id},{status:0}]}).populate('to')
        

        res.json({msg:"removed Successfully",request,pending})
       


    } catch (err) {
        return res.status(500).json({msg:err.message})
    }


},


//EVENTS
addEvent:async(req,res)=>{
        try {
            const {file,title,desc,event_date,event_start_time,event_end_time}=req.body
         const added=await Event.create({
                file:file,
                user: req.user._id,
                title:title,
                desc:desc,
                event_date: event_date,
                event_start_time: event_start_time,
                event_end_time:event_end_time,
                
                })

  const newEvent=await Event.find({user:req.user._id})
  console.log(newEvent)
res.json({msg:"event created successfully",data:newEvent})
    
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
    
        }
    
    
    },
    
updateEvent:async(req,res)=>{
        try {
const {file,title,desc,event_date,event_start_time,event_end_time}=req.body
        const updated=await Event.findByIdAndUpdate({_id:req.body.id},{
            file:file,
            title:title,
            desc:desc,
            event_date: event_date,
            event_start_time: event_start_time,
            event_end_time:event_end_time,
            
            })

  const newEvent=await Event.find({user:req.user._id})
  console.log(newEvent)

            res.json({msg:"event updated successfully",data:newEvent})
    
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
    
        }
    
    
    },
    
deleteEvent:async(req,res)=>{
        try {
            const user=await Event.deleteOne({_id:req.headers.id})
            console.log(user)
            const newEvent=await Event.find({user:req.user._id})
            res.json({msg:"event deleted successfully",data:newEvent})
    
            
        } catch (err) {
                    return res.status(500).json({msg:err.message})
        }
    },





//Courses
addCourse:async(req,res)=>{
        try {
            const {file,title,desc,price,duration}=req.body
           const course= await Course.create({
                user: req.user._id,
                file:file,
                title: title,
                desc: desc,
                price:price,
                duration:duration,
                
                })
            const newCourse=await Course.find({user:req.user._id})
            res.json({msg:"Course added successfully",data:newCourse})
    
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
    
        }
    
    
    },
    
updateCourse:async(req,res)=>{
        try {
            const {file,title,desc,id,price,duration}=req.body
        const updated=await Course.findByIdAndUpdate({_id:req.body.id},{
            file:file,
            title: title,
            desc: desc,
            price:price,
            duration:duration,
            })
            const newCourse=await Course.find({user:req.user._id})

            res.json({msg:"course updated successfully",data:newCourse})
    
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
    
        }
    
    
    },
    
deleteCourse:async(req,res)=>{
        try {
            const user=await Course.deleteOne({_id:req.headers.id})
            const newCourse=await Course.find({user:req.user._id})
            res.json({msg:"course deleted successfully",data:newCourse})
    
            
        } catch (err) {
                    return res.status(500).json({msg:err.message})
        }
    },
    
follow:async(req,res)=>{
    try {
        const user=await User.find({_id:req.params.id})
        
        if(user[0].followers.includes(req.user._id.toString()))return res.status(500).json({msg:"already following"})
        
        await User.findOneAndUpdate({_id:req.params.id},{
            $push:{followers:req.user._id}
        },{new:true})

        await User.findOneAndUpdate({_id:req.user._id},{
            $push:{following:req.params.id}
        },{new:true})

        res.json({msg:'Followed'})




        
    } catch (err) {
                return res.status(500).json({msg:err.message})
    }
},


unfollow:async(req,res)=>{
    try {
        await User.findOneAndUpdate({_id:req.params.id},{
            $pull:{followers:req.user._id}
        },{new:true})

        await User.findOneAndUpdate({_id:req.user._id},{
            $pull:{following:req.params.id}
        },{new:true})

        res.json({msg:'UnFollowed'})




        
    } catch (err) {
                return res.status(500).json({msg:err.message})
    }   
},
addInterest:async(req,res)=>{

const {interestId}=req.body
if(interestId==='undefined')return res.status(500).json({msg:'add an interest'})

for(let i of req.user.interest)
{
    if(i.toString()===interestId)return res.status(500).json({msg:'cannot add the same Interest again'})

}
try {
    const interestupdate=await User.findByIdAndUpdate(req.user._id,{
        $push:{interest:req.body.interestId}
    })
    const user=await User.findById(req.user._id).populate('interest')
    res.json({msg:'Skill added successfully',data:user.interest})
} catch (err) {
    res.status(500).json({msg:err.message})
}

},
deleteInterest:async(req,res)=>{
    try{
        console.log(req.body)
       const deleteInterest=await User.findByIdAndUpdate(req.user._id,{
        $pull:{interest:req.body.interestId}
    })
    
    const newInterest=await User.findById(req.user._id).populate('interest')
    const interest=newInterest.interest
    res.json({msg:"Interest Removed Successfully",interest})


        
    }
    catch(err)
    {
        
    }
}

,
schoolInfo:async(req,res)=>{
    const{school,address,established_on}=req.body.info
    try {
        const info=await User.findByIdAndUpdate(req.user._id,{
                fullname:school,
                address,
                established_on
        })
        const user=await User.findById(req.user._id)
        res.json({msg:'Info Updated Successfully',data:user})
        
    } catch (err) {
        res.status(500).json({msg:err.message})

    }
},



//School achievements
addAchievements:async(req,res)=>{
    
    
    try {
    const {desc,title,file}=req.body

    await Achievements.create({
        title,
        desc,
        user:req.user._id,
        file
        
        })
    const Achievement=await Achievements.find({user:req.user._id})  

        res.json({msg:"Achievement added successfully",data:Achievement})

        
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }


},

updateAchievements:async(req,res)=>{
    
    try {
    const {user,file,desc,id,title}=req.body
    const users =await Achievements.findByIdAndUpdate({_id:req.body.id},{
    user,file,desc,id,title})
        const Achievement=await Achievements.find({user:req.user._id})  
        res.json({msg:"Achievement updated successfully",data:Achievement})

        
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }


},

deleteAchievements:async(req,res)=>{
    try {
        const user=await Achievements.deleteOne({_id:req.headers.id})
        const Achievement=await Achievements.find({user:req.user._id})  
        res.json({msg:"Achievement deleted successfully",data:Achievement})

        
    } catch (err) {
                return res.status(500).json({msg:err.message})
    }
},
enrollCourse:async(req,res)=>{
    
    try {
        const {courseId}=req.body
        const enrollCourse=await User.findByIdAndUpdate(req.user._id,{
            $push:{courses:courseId}
        },{new:true})

        const addParticipants=await Course.findByIdAndUpdate(courseId,{
            $push:{participants:req.user._id}
        },{new:true})
        
        const user=await User.findById(req.user._id).populate('courses').populate('events')
        const courses=await Course.find({user:addParticipants.user}).populate('participants') 

        res.json({msg:"enrolled for course",data:user,courses:courses})
        
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }
},
joinevent:async(req,res)=>{
    
    try {
        const {eventId}=req.body
        const event=await Event.findById(eventId)
        
        if(event.participants.includes(req.user._id))return res.status(400).json({msg:"Already enrolled"})

        const joinEvent=await User.findByIdAndUpdate(req.user._id,{
            $push:{events:eventId}
        },{new:true})

        const addParticipants=await Event.findByIdAndUpdate(eventId,{
            $push:{participants:req.user._id}
        },{new:true})

        const events=await Event.find({user:addParticipants.user}).populate('participants') 
        const user=await User.findById(req.user._id).populate('courses').populate('events')
        res.json({msg:"joined event",data:user,events:events})

        
    } catch (err) {
        return res.status(500).json({msg:err.message})

    }
},
changePassword:async(req,res)=>{
try {

    console.log(req.body.oldpassword,req.user.password)
    const isMatch=await bcrypt.compare(req.body.oldpassword,req.user.password)
    console.log(isMatch)
    if(!isMatch) return res.json({msg:"Current Password is incorrect"})
    const passwordHash=await bcrypt.hash(req.body.password,12)
    const userupdate=await User.findByIdAndUpdate(req.user._id,{
        password:passwordHash,
    })
    return res.json({msg:"Password updated"})

} catch (err) {
    console.log(err)
}
},

deleteFriend:async(req,res)=>{
    console.log(req.headers.id)
    try {
        const connection=await Connections.findOneAndDelete({$or:[{$and:[{to:req.user._id},{from:req.headers.id}]},{$and:[{to:req.headers.id},{from:req.user._id}]}]})
        await User.findOneAndUpdate({_id:req.headers.id},{
            $pull:{following:req.user._id}
        },{new:true,upsert:true})


        await User.findOneAndUpdate({_id:req.user._id},{
            $pull:{following:req.headers.id}
        },{new:true,upsert:true})

        await User.findOneAndUpdate({_id:req.headers.id},{
            $pull:{followers:req.user._id}
        },{new:true,upsert:true})
        await User.findOneAndUpdate({_id:req.user._id},{
            $pull:{followers:req.headers.id}
        },{new:true,upsert:true})
        const user=await User.findById(req.user._id).populate('courses events followers following')
        return res.status(200).json({msg:"removed friend",data:user})

    } catch (err) {
        return res.status(200).json({msg:err.msg})
    }
},

razorpay:async(req,res)=>{
    console.log("we are going to paay")
    if(req.user.role==='student') return res.json({msg:"you are not authorized"})
    const plan=await Plans.findById(req.params.id)
    console.log(plan)
    var instance = new Razorpay({
        key_id:process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET,
      });
    const amount=plan.price
    const name=plan.name
    const payment_capture=1
    const options={
        amount:amount*100, 
        currency:'INR', 
        receipt:shortid.generate(), 
        payment_capture, 
        }
    const response=await instance.orders.create(options)
    console.log(response)
    res.json({
        id:response.id,
        currency:response.currency,
        amount:response.amount,
        name:name,
        notes: {
            address: "Razorpay Corporate Office",
            "userid":req.user._id,
            "planid":req.params.id   //using id to validate the plan bought

        },
    })
    

},
razoryverify:async(req,res)=>{
    //do a validation
    const Secret=process.env.WEBHOOK_RAZOR
    console.log("jellsldlsdlsldlaldasd",req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', Secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])
    console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
        const ids=req.body.payload.payment.entity
        console.log(ids)
        const plans=await Plans.findByIdAndUpdate(ids.notes.planid,{$push:{purchasedBy:ids.notes.userid}},{new:true})
        const expirytime= await Plans.findById(ids.notes.planid)
        const expiry='5m'
        console.log("expirty sjadkjaskjdkasjkdjkasdkjasjdjkas",expirytime)
        const hello =await purchased.create({
            plan:ids.notes.planid,
            purchasedBy:ids.notes.userid,
            'expireAt.index.expires': expiry,
            ...ids,

        })

        console.log(hello)

        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))

		// process it
	} else {
		// pass it
        console.log("not a legit request")
	}
	res.json({ status: 'ok' })
},
getAllMessage:async(req,res)=>{

    const allmessages=await Allmessages.find()
    res.json(allmessages)
},

profileVerify:async(req,res)=>{
    console.log("here")
    const verify=await verification.create({profile:req.user._id})
    console.log(verify)
    res.json({msg:"verification request sent"})
},
hideprofile:async(req,res)=>{
    console.log(req.body)
    const verify=await User.findByIdAndUpdate(req.user._id,{hideprofile:req.body.hideprofile})
    console.log(verify)
    if(req.body.hideprofile===true)
    {
        res.json({msg:"profile hidden "})

    }
    else{
        res.json({msg:"profile unhidden "})

    }
},
getreciept:async(req,res)=>{
    const reciept=await purchased.find({purchasedBy:req.user._id}).populate('plan purchasedBy')
    res.json(reciept)
},
mediaupload:async(req,res)=>{
    const files=req.files
    console.log("new file",files)
    const milliseconds=new Date()
    const mediaPath='/uploads/'+milliseconds.getTime()+files.file.name
    files.file.mv('./public'+mediaPath, err => {
        if (err) {
          console.log("here")
          console.error(err);
          return res.status(500).send(err);
        }
        res.json({ message: "Successfully uploaded files",secure_url:mediaPath});

      });
    console.log(req.body);
    console.log(req.files);
},
createpage:async(req,res)=>{
    console.log(req.body)
        const page=await Createpage.create({...req.body,createdBy:req.user._id})
        res.json(page)
    },
editpage:async(req,res)=>{
        console.log(req.body)
            const page=await Createpage.findByIdAndUpdate(req.body._id,{...req.body})
            const editedpage=await Createpage.find({createdBy:req.user._id})
            res.json(editedpage)
        },
deletepage:async(req,res)=>{
            console.log(req.body)
                const page=await Createpage.findByIdAndDelete(req.params.id)
                res.json({msg:"page deleted successfully",id:req.params.id})
            },

getpage:async(req,res)=>{
    console.log(req.params.id)
    // getting posts
    const pagedetail=await Createpage.findById(req.params.id)
    const post=await Posts.find({user:req.params.id})
    console.log(pagedetail,post)

    res.json({pagedetail,post})
    
},
studentpostpre:async(req,res)=>{
    const posts=await Studentpost.find()
    res.json(posts)

}


}




module.exports=UserController
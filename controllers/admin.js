const User=require('../models/User')
const Posts=require('../models/Posts')
const Comments=require('../models/Comments')
const Interest=require('../models/InterestModel');
const Skills = require('../models/UserSkills');//skills of students that they have selected from admin skills
const geocoder=require('../utils/geocoder')
const Message=require('../models/Message')
const notify=require('../models/notify')
const Education=require('../models/UserEducation')
const Conversation = require('../models/Conversation');
const Achievements=require('../models/Achievements')
const Courses=require('../models/Courses')
const Events=require('../models/Events')
const AdminSkills=require('../models/Skills'); //for adding skills from admin side
const Plans = require('../models/Plans');
const purchased = require('../models/purchased');
const Profile = require('../models/Profile');
const SchoolData = require('../models/SchoolData');
const Allmessages = require('../models/Allmessages');
const verification = require('../models/verification');



//common function
const idfun=(user)=>
{
    const obj=user.toObject();
    //Rename fields
    obj.id = obj._id;
    delete obj._id;
    return obj
}

 

const admin={
    //Student General
    showUsers:async(req,res)=>{
        const user=await User.find().populate('-password') 
        

        const alluser=[] 
        const newUser=user.map(use=>{
            var obj = use.toObject();

            //Rename fields
            obj.id = obj._id;
            delete obj._id;
            if(use.role==='student')
            {
                alluser.push(obj);

            }
        })
        res.header('Content-Range',`users 0-10/${alluser.length}`)  

        res.status(200).json(alluser);

    },
    
    showUser:async(req,res)=>{
        console.log(req.params.id)
        const user=await User.findById(req.params.id)
        var obj = idfun(user)
    res.status(200).json(obj);
    },

    editUser:async(req,res)=>{
        console.log(req.params.id)
        const user=await User.findByIdAndUpdate(req.params.id,{
            ...req.body
        })
        var obj=idfun(user)
        res.status(200).json(obj)


    },
    deleteUser:async(req,res)=>{
        console.log(req.params.id)
        const post=await Posts.remove({user:req.params.id})
        const comments=await Comments.remove({user:req.params.id})
        const messages=await Message.remove({$or:[{recipient:req.params.id},{sender:req.params.id}]})
        const notifies=await notify.remove({user:req.params.id})
        const education=await Education.remove({user:req.params.id})
        const conversation=await Conversation.remove({recipient:req.params.id})
        const achievements=await Achievements.remove({user:req.params.id})
        const courses=await Courses.remove({user:req.params.id})
        const events=await Events.remove({user:req.params.id})
        const user=await User.findByIdAndDelete(req.params.id)
        res.json({msg:"deleted the user"})
    },
// Student end

showSchools:async(req,res)=>{
    const user=await User.find().select('-password')  
        

        const alluser=[] 
        const newUser=user.map(use=>{
            var obj = use.toObject();

            //Rename fields
            obj.id = obj._id;
            delete obj._id;
            if(use.role==='school')
            {
                alluser.push(obj);

            }
        })
        res.header('Content-Range',`users 0-10/${alluser.length}`)  

        res.status(200).json(alluser);
},


//Posts
showPosts:async(req,res)=>{
    const posts=await Posts.find().populate('user','-password')
    const alluser=[] 
    const newUser=posts.map(use=>{
        var obj = use.toObject();

        //Rename fields
        obj.id = obj._id;
        delete obj._id;
     
            alluser.push(obj);
    })    
    res.header('Content-Range',`users 0-10/${alluser.length}`)  

    res.status(200).json(alluser)
},

//show posts
showPost:async(req,res)=>{
    console.log(req.params.id)
    const posts=await Posts.findById(req.params.id)
    var obj = idfun(posts)
res.status(200).json(obj);
},
//edit post 
editPost:async(req,res)=>{
    console.log(req.params.id,"this is the post id")

},
deletePost:async(req,res)=>{
    const deletePost=await Posts.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"deleted successfully"})
},

//Posts End

//getting Interest
showInterests:async(req,res)=>{
const interest=await Interest.find()
console.log(interest)
const allinterest=[] 
const newUser=interest.map(use=>{
    var obj = use.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;
 
        allinterest.push(obj);
})    
res.header('Content-Range',`users 0-10/${allinterest.length}`)  

res.status(200).json(allinterest)


},
//single Interest
showInterest:async(req,res)=>{
    console.log("hello",req.params.id)
    const interest=await Interest.findById(req.params.id)
    console.log(interest,"this is the interest")
    var obj = idfun(interest)
    res.status(200).json(obj);
},






//Interest End

//Skills
showSkills:async(req,res)=>{
    const skills=await Skills.find().populate('user','-password')
    const allskills=[] 
const newUser=skills.map(use=>{
    var obj = use.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;
 
        allskills.push(obj);
})    
res.header('Content-Range',`skills 0-10/${allskills.length}`)  

res.status(200).json(allskills)

    
},



userInRadius:async(req,res)=>{
    const {location,distance}=req.params
    const isUserPaid=await purchased.find({user:req.user._id})
    console.log(isUserPaid,"not paid at all")
    if(isUserPaid.length===0)return res.json({msg:"please Buy a plan to post add"})
    console.log(location)
    //get lat/long from geocoder
    const loc=await geocoder.geocode(location)
    const lat=loc[0].latitude
    const lng=loc[0].longitude

    console.log(lat,lng)
       // Calc radius using radians
      // Divide dist by radius of Earth
     // Earth Radius = 3,963 mi / 6,378 km
const radius = (parseInt(distance)*0.6214) / 3963;
const user = await User.find({
location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
});

if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  console.log(req.files)
let filePath=[]
const files=req.files
const milliseconds=new Date()

for(var file in files)
{
  const imagePath='/uploads/'+milliseconds.getTime()+files[file].name
  files[file].mv('./public'+imagePath, err => {
    if (err) {
      console.log("here")
      console.error(err);
      return res.status(500).send(err);
    }

  });
  filePath.push(imagePath)
}
const ads=[]
for(let i of user)
{
console.log(i._id)
ads.push(i._id)
}




try {
    const {content}=req.body

    const newPost=new Posts({
            user:req.user._id,content,images:filePath,ads
    })
    await newPost.save()

    res.json({
        msg:'Advertisement Posteed',
        newPost:{
            ...newPost._doc,
            user:req.user
        }
    })
} catch (err) {
    
    return res.status(500).json(
        {msg:err.message}
    )

}


},
getAds:async(req,res)=>{
    const posts=await Posts.find().populate('user','-password')
    const alluser=[] 
    const newUser=posts.map(use=>{
        var obj = use.toObject();

        //Rename fields
        obj.id = obj._id;
        delete obj._id;
        if(obj.ads.length>0)
        {
            alluser.push(obj);

        }
    })    
    res.header('Content-Range',`users 0-10/${alluser.length}`)  

    res.status(200).json(alluser)

},

createPackage:async(req,res)=>{
try {

const plans=await Plans.create(req.body)
res.status(200).json({msg:plans})
    
} catch (error) {
    res.status(200).json({msg:"cannot post the same plan again"})
}

},


getSkills:async(req,res)=>
{
const skills=await AdminSkills.find()
res.json(skills)

},
getSkill:async(req,res)=>
{
    console.log("here we are")
const skills=await AdminSkills.findById(req.params.id)
console.log(skills)
res.json(skills)

},
addSkill:async(req,res)=>
{
    console.log(req.body)
const skills=await AdminSkills.create({name:req.body.skill})
console.log(skills)
res.json(skills)
},
deleteSkill:async(req,res)=>
{
const skills=await AdminSkills.findByIdAndDelete(req.params.id)
res.json(skills)
},
editSkills:async(req,res)=>{
    console.log(req.body)
    const skills=await AdminSkills.findByIdAndUpdate(req.params.id,{...req.body})
    res.status(200).json({msg:"skill updated"})
},
purchaseList:async(req,res)=>{
    console.log("hello  purchases")
    const purchases=await purchased.find().populate('plan purchasedBy')
    res.json(purchases)

},

deletePlans:async(req,res)=>{
    console.log(req.params.id)
    const deleteplan=await Plans.findByIdAndDelete(req.params.id)
    const plans=await Plans.find()
    res.json({data:plans})
}
,
getAll:async(req,res)=>{
    const user=await User.find()
    const student=user.filter(user=>user.role=='student')
    const school=user.filter(user=>user.role=='school')
    const skills=await Skills.find()
    const schooladd=await SchoolData.find()
    const profile=await Profile.find()
    const purchasedBy=await Plans.find()
 
console.log("hello")

res.json({data:{student,school,skills,schooladd,profile,purchasedBy}})

},
postAllmessages:async(req,res)=>{
    console.log("hekki",req.body)
    const allmessages=await Allmessages.create({
        ...req.body
    })
    console.log("added messages")

},
getAllMessage:async(req,res)=>{
    console.log(req.body)
    const allmessages=await Allmessages.find()
    res.json(allmessages)
},
deleteMessages:async(req,res)=>{
    const allmessages=await Allmessages.findByIdAndDelete(req.params.id)
    console.log(allmessages)
},
editmessage:async(req,res)=>{
    const a=await Allmessages.findByIdAndUpdate(req.params.id,{...req.body})
    console.log("updatesdsds")

    res.json({msg:"updated successfully"})


},
getmessage:async(req,res)=>{
    const a=await Allmessages.findById(req.params.id)
    console.log(a)
    res.json(a)
},
verificationList:async(req,res)=>{
    const a=await verification.find().populate('profile')
    console.log(a)
    res.json(a)
},
verifyuser:async(req,res)=>{
    console.log("here")
    const a=await verification.findById(req.params.id)
    const b=await User.findByIdAndUpdate(a.profile._id,{
        verified:true
    })
    const c=await verification.findByIdAndDelete(req.params.id)
    const d=await verification.find().populate('profile')

    console.log("deleted and verified")

    res.json(d)
}

}


module.exports=admin

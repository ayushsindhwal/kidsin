const router=require('express').Router()
const {showUsers,editmessage,getmessage,verificationList,createPackage,showUser,editUser,deleteMessages,editPost,editSkills, showSchools, showPosts, showPost,showInterest,showInterests, showSkills, userInRadius, getAds, deleteUser, deletePost,getAll ,getSkill, deleteSkill, addSkill, getSkills, purchaseList,getAllMessage,deletePlans, postAllmessages, verifyuser}=require('../controllers/admin')
const { adminlogin,generateAccessToken, logout } = require('../controllers/auth')
const auth = require('../middleware/auth')
//General get
router.post('/login',adminlogin)
router.post('/logout',logout)
router.post('/refresh_token',generateAccessToken)
router.get('/purchase',auth,purchaseList)
router.get('/getall',auth,getAll)
router.get('/verification',auth,verificationList)
router.post('/verify/:id',auth,verifyuser)

router.get('/users',auth,showUsers)
router.get('/schools',auth,showSchools)
router.get('/posts',auth,showPosts)
router.get('/interests',auth,showInterests)
router.get('/studentskills',auth,showSkills)

//Single User
router.get('/users/:id',auth,showUser)
router.put('/users/:id',auth,editUser)
router.delete('/users/:id',auth,deleteUser)


//single Post
router.get('/posts/:id',auth,showPost)
router.put('/posts/:id',auth,editPost)
router.delete('/posts/:id',auth,deletePost)


//single interest
router.get('/interests/:id',auth,showInterest)
// router.post('/interests/:id',auth,createInterest)
// router.put('/interests/:id',auth,editInterest)


//single skills






//get students in radius and post ads
router.post('/createpackage',createPackage)
router.get('/ads',auth,getAds)
router.post('/ads/:location/:distance',auth,userInRadius)



//get skills and add skills
router.get('/skills/:id',auth,getSkill)
router.get('/skills',auth,getSkills)
router.post('/skills',auth,addSkill)
router.put('/skills/:id',auth,editSkills)
router.delete('/skills/:id',auth,deleteSkill)
router.delete('/plans/:id',auth,deletePlans)



//messages

router.get('/message/:id',auth,getmessage)
router.get('/getallmessages',auth,getAllMessage)
router.post('/postallmessages',auth,postAllmessages)
router.put('/message/:id',auth,editmessage)
router.delete('/messages/:id',auth,deleteMessages)





module.exports=router
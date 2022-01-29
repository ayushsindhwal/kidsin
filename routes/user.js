const router=require('express').Router()
const UserController=require('../controllers/user')
const auth = require('../middleware/auth')
const User = require('../models/User')
const {userInRadius}=require('../controllers/admin')
const { profileVerify, hideprofile, getreciept,deletepage, mediaupload, createpage, editpage, getpage, studentpostpre } = require('../controllers/user')
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.get('/userDetails',UserController.userDetails)
router.get('/search',UserController.searchUser)
// router.get('/usesDetails/:id',UserController.usesDetails)
router.get('/user/:id',UserController.getUser)
router.get('/getallmessage',UserController.getAllMessage)

//user info
router.patch('/user',UserController.updateUser)



//DASHBOARD PAGE
router.patch('/about',UserController.updateAbout)//ABOUT
router.post('/add-education',UserController.addEducation)//ADDEDUCATION
router.patch('/update-education',UserController.updateEducation)//UPDATEEDUCATION
router.delete('/delete-education',UserController.deleteEducation)//DELETEEDUCATION      
router.post('/update-skills',UserController.updateSkills)
router.delete('/delete-skills',UserController.deleteSkills)
router.patch('/endrosed-skills',UserController.endrosedSkills)
router.post('/add-certificate',UserController.addCertificate)
router.patch('/update-certificate',UserController.updateCertificate)
router.delete('/delete-certificate',UserController.deleteCertificate)

//DASHBOARD SCHOOL
router.patch('/schoolinfo',UserController.schoolInfo)
router.post('/add-achievement',UserController.addAchievements)
router.patch('/update-achievement',UserController.updateAchievements)
router.delete('/delete-achievement',UserController.deleteAchievements)

//Connection Routes
router.post('/sendrequest',UserController.sendRequest)
router.post('/acceptrequest',UserController.acceptRequest)
router.delete('/deleterequest',UserController.deleteRequest)
router.delete('/deleteFriend',UserController.deleteFriend)



//School Events
router.post('/add-event',UserController.addEvent)
router.patch('/update-event',UserController.updateEvent)
router.delete('/delete-event',UserController.deleteEvent)


//School Courses
router.post('/add-course',UserController.addCourse)
router.patch('/update-course',UserController.updateCourse)
router.delete('/delete-course',UserController.deleteCourse)

//Student courses:
router.post('/enroll-course',UserController.enrollCourse)
//Join Event:
router.post('/join-event',UserController.joinevent)


//
router.patch('/user/:id/follow',UserController.follow)
router.patch('/user/:id/unfollow',UserController.unfollow)
router.get('/userDetails/:id',UserController.userDetails)


router.post('/addinterest',UserController.addInterest)
router.patch('/deleteinterest',UserController.deleteInterest)

router.post('/changePassword',UserController.changePassword)
//Razorpay payment
router.post('/razorpay/:id',UserController.razorpay)

router.post('/ads/:location/:distance',auth,userInRadius)

router.post('/verifyprofile',profileVerify)
router.post('/hideprofile',hideprofile)
router.get('/getreciept',getreciept)
router.post("/mediaupload", upload.single("file"), mediaupload);
router.post('/createpage',createpage)
router.put('/editpage',editpage)
router.delete('/page/:id',deletepage)
router.get('/page/:id',getpage)
router.get('/studentpostpre',studentpostpre)

module.exports= router
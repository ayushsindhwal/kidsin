const express = require('express');
const { generalDetails, postDetails, allinterest, getPlans, allskills } = require('../controllers/data');
const UserController = require('../controllers/user');
const router=express.Router()

router.get('/generaldata',generalDetails)
router.get('/profile',postDetails)
router.get('/interests',allinterest)
router.get('/allskills',allskills)
router.get('/plans',getPlans)
router.post('/verification',UserController.razoryverify)







module.exports=router

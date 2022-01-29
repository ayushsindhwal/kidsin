const SchoolData = require('../models/SchoolData')
const Profile = require('../models/Profile')
const Interest = require('../models/InterestModel')
const Plans = require('../models/Plans')
const Skills = require('../models/Skills')

exports.generalDetails=async(req,res)=>{
    
    const schoolData=await SchoolData.find()
    res.json({data:schoolData})
}
exports.postDetails=async(req,res)=>{
    const profileData=await Profile.find()
    res.json({data:schoolData})
}

exports.allinterest=async(req,res)=>{
    const interestData=await Interest.find()
    res.json({data:interestData})
}

exports.allskills=async(req,res)=>{
    const skillData=await Skills.find()
    res.json(skillData)
}


exports.getPlans=async(req,res)=>{
    const plans=await Plans.find()
    res.json({data:plans})
}
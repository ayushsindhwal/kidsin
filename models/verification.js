const mongoose=require('mongoose')

const profileVerify=new mongoose.Schema({
   
    profile:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})

module.exports=mongoose.model('ProfileVerify',profileVerify)
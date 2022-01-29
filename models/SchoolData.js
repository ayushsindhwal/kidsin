const mongoose = require('mongoose');

const SchoolData=new mongoose.Schema({
    schoolname:{
        type:String
    },
    contacts:{
        type:String
    },
    emailid:
    {
        type:String
    },
    profile:
    {
        type:String
    },
    board:{
        type:String
    }
})


module.exports=mongoose.model('SchoolData',SchoolData)
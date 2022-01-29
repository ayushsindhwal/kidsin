const mongoose = require('mongoose');

const Profile=new mongoose.Schema({
    schoolname:{
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


module.exports=mongoose.model('Profile',Profile)
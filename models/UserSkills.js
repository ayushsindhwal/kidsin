const mongoose = require('mongoose');
const UserSkillSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    skill:{
        type:String,
    },
   endrosedBy:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
})

 module.exports = mongoose.model('UserSkill', UserSkillSchema);

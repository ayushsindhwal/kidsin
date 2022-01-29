var mongoose = require("mongoose");
var Skill = mongoose.Schema({
    name: {
        type: String
    }, 
    created_date: {
        type: Date, default: Date.now
    }
});
module.exports = mongoose.model('Skill', Skill);
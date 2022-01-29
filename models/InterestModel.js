var mongoose = require("mongoose");
var InterestSchema = mongoose.Schema({
    name: {
        type: String
    },
    interestimage: {
        type: String
    },
    file:{
        type:String
    },
  
    created_date: {
        type: Date, default: Date.now
    }
});
module.exports = mongoose.model('Interest', InterestSchema);
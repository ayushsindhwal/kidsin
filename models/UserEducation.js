var mongoose = require("mongoose");
var UserEducationSchema = mongoose.Schema({
    school: {
        type: String
    },
    profile:{
        type:String
    },
    class_start: {
        type: String
    },
    class_end: {
        type: String
    },
    start_year: {
        type: Number
    },
    end_year: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
});
module.exports = mongoose.model('UserEducation', UserEducationSchema);
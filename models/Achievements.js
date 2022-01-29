var mongoose = require("mongoose");
var CourseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    file: {
        type: String
    },
    deleted: {
        type: Number,
        default: 0
    },
    created_date: {
        type: Date, default: Date.now
    }
});
module.exports = mongoose.model('achivements', CourseSchema);
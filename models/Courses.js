var mongoose = require("mongoose");
var CourseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    price: {
        type: String
    },
    duration: {
        type: String
    },
    file: {
        type: String
    },
    created_date: {
        type: Date, default: Date.now
    },
    participants:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        }]
});
module.exports = mongoose.model('courses', CourseSchema);
var mongoose = require("mongoose");
var EventSchema = mongoose.Schema({
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
    event_date: {
        type: Date, default: Date.now
    },
    event_start_time: {
        type: String
    },
    event_end_time: {
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
    },
    participants:[{type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
}]
});
module.exports = mongoose.model('events', EventSchema);
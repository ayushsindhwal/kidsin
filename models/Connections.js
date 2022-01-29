var mongoose = require("mongoose");
var Connections = mongoose.Schema({
    
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    created_date: {
        type: Date, default: Date.now
    },
    status: {
        type: Number,
        default: 0
    },
    contype:{
        type:String
    }
});
module.exports = mongoose.model('Connections', Connections);
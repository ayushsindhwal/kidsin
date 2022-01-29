var mongoose = require("mongoose");
var UserCertification = mongoose.Schema({
    certificate: {
        type: String
    },
    details: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    file: {
        type: String
    },
});
module.exports = mongoose.model('UserCertification', UserCertification);
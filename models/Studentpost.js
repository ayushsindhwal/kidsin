var mongoose = require("mongoose");
var StudentPostSchema = mongoose.Schema({
    text: {
        type: String
    },

});
module.exports = mongoose.model('Studentpost', StudentPostSchema);
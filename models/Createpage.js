const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const pageSchema = new mongoose.Schema(
  {
    fullname:String,
    image:String,
    desc:String,
    
    followers: [{ type: ObjectId, ref: "User" }],
    createdBy: { type: ObjectId, ref: "User" },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },

);

module.exports = mongoose.model("Page", pageSchema);

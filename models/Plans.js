const mongoose = require("mongoose");
const planSchema = new mongoose.Schema(
  {
    price:Number,
    benefits:Array,
    purchasedBy:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    name:{
      type:String,
      unique:true,
    },
    time:
    {
      type:Number,
      unique:true
    },
    timeofAd:{
      type:Number,
      unique:true
    }
  },
  {
    timestamps:true
  }
);





module.exports = mongoose.model("Plans", planSchema);

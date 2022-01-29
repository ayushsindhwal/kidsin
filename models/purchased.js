const mongoose = require("mongoose");
const planSchema = new mongoose.Schema(
  {
    plan:{type:mongoose.Schema.Types.ObjectId, ref:'Plans'},
    purchasedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
 
    contact:String,
    email:String,
    card_id:String,
    order_id:String,
    method:String,
    id:String,
    amount:Number

  },
  {
    timestamps:true
  }
);





module.exports = mongoose.model("Purchased", planSchema);

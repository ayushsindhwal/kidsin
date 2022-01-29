const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    content:{
      type:String
    }
    ,
    images: {
      type: Array,
      default:[]
    },
  
   likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    comments: [{type:mongoose.Types.ObjectId, ref:'Comment'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
   ads:{type:Array,default:[]},
   stopcomment:{type:Boolean,default:false},
   report:Number

  },
  {
    timestamps:true
  }
);





module.exports = mongoose.model("Post", postSchema);

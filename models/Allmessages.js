const mongoose=require('mongoose')

const AllmessageSchema=new mongoose.Schema({
   
    text:String,
},{
    timestamps:true
})

module.exports=mongoose.model('Allmessage',AllmessageSchema)
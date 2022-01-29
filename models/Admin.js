const mongoose = require('mongoose');
const geocoder=require('../utils/geocoder')
const adminSchema=new mongoose.Schema({
fullname:{
    type:String,
    required:true,
    trim:true,
    maxLength:250,
    },
hideprofile:Boolean,


//if you need user name
// username:{
//         type:String,
//         trim:true,
//         maxLength:250,
//         unique:true,
// },




email:{
    type:String,
    required:true,
    trim:true,
    unique:true,

},
emailconfirmed:{type:Boolean,default:false},
emailtoken:String,

password:{
    type:String,
    required:true,
   
},
avatar:{
    type:String,
    default:''
},
role:{
    type:String,
    required:true,
   
},
gender:{
    type:String,
},
mobile:{
    type:String,
    default:'',
},
address:{
    type:String,
    default:'',
},    
location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
story:{
    type:String,
    default:'',
    maxlength:'200'
},
website:{
    type:String,
    default:'',
},
mom_name: {
    type: String
},
dad_name: {
    type: String
},
dob: {
    type: Date,
    default:"",
},
established_on: {
    type: String
},
about: {
        type: String
    },
address: {
        type: String
    },
    mom_name: {
        type: String
    },
    dad_name: {
        type: String
    },
    address: {
        type: String,
        required:true
    },
    location: {
        type:{ 
            type:String,
            enum:["Point"]
        
        },
        coordinates: {
            type:[Number],
            index:'2dsphere'
            
        },
        formattedAddress:String,
        street:String,
        city: String,
        zipcode:String,
        country:String
    },
interest:[{type:mongoose.Types.ObjectId,  ref:'Interest'}],
followers:[{type:mongoose.Types.ObjectId, ref:'User'}],
following:[{type:mongoose.Types.ObjectId, ref:'User'}],
courses:[{type:mongoose.Types.ObjectId,  ref:'courses'}],
events:[{type:mongoose.Types.ObjectId,  ref:'events'}],
resetToken:{type:String},
verified:Boolean
},
{
    timestamps:true,
  
})

module.exports=mongoose.model('Admin',adminSchema)





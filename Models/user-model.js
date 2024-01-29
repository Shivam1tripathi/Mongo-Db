const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userschema=new Schema({
  FirstName:{
    type:String,
    required:true,
  },
  LastName:{
    type:String,
    required:true,
  },
  Email:{
    type:String,
    required:true,
  },
  IssuedBook:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Book",
    required:false,
  },
  ReturnDate:{
    type:String,
    required:false,
  },
  SubscriptionType:{
    type:String,
    required:true,
  },
  SubscriptionDate:{
    type:String,
    required:true,
  }
},
{
    timestamps:true,
});
module.exports=mongoose.model("User",userschema);
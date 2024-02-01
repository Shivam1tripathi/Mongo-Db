const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bookschema=new Schema({
    Name:{
        type:String,
        required:true,
    },
    Author:{
        type:String,
        required:true,
    },
    Genre:{
        type:String,
        required:true,
    },
    Price:{
        type:String,
        required:true,
    },
    Publisher:{
        type:String,
        required:true,
    }

},
{
    timestamps:true,
});
module.exports=mongoose.model("Book",bookschema);
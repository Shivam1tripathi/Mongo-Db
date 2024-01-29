const mongoose=require("mongoose");


function DbConnection(){
    const Db_URL=process.env.Mongo_URI;
    mongoose.connect(Db_URL,{
       
});
}
const db=mongoose.connection;
db.on("error", console.error.bind(console,"connections error to hai"));
db.once("open",function(){
    console.log("Db Connected...")
})
module.exports=DbConnection;
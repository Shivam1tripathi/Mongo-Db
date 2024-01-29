const express=require("express");
// const {users} = require("./data/users.json");
const dotenv=require("dotenv");
const DbConnection=require("./databaseconnections");
dotenv.config();


const app=express();
 
DbConnection();

const port=8081;
const usersrouters=require("./Routes/users");
const booksrouters=require("./Routes/books");


app.use(express.json());
app.use("/users",usersrouters);
app.use("/books",booksrouters);
app.get("*",(req,res)=>{
    res.status(401).json({
        message:"page not found",
})
})
app.listen(port,()=>{
console.log('server is runing '+port);
})

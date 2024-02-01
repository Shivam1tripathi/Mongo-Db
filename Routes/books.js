const express=require("express");
const {getallbook, getsinglebook,allissuedbook,addnewbook,updatebookbyid}=require("../controlers/book-controler");

const {UserModel,BookModel}=require("../Models/index");

const router=express.Router();
//will print all books
router.get("/",getallbook);


//check book with issued

router.get("/issued",allissuedbook);


//will print perticular book by bookno. that is given
router.get("/:id",getsinglebook);






// adding element

router.post("/",addnewbook);

//updating book details

router.put("/:id",updatebookbyid);


module.exports=router;
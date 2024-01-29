const express=require("express");
const {getallbook, getsinglebook}=require("../controlers/book-controler");
const {Books} = require("../data/books.json");
const {users} = require("../data/users.json");
const {UserModel,BookModel}=require("../Models/index");

const router=express.Router();
//will print all books
router.get("/",getallbook);


//check book with issued

router.get("/issued",(req,res)=>{
    const userwithissuedbook=users.filter((each)=>{ 
    if(each.books_issued) return each;
});

const issuedbook=[];
userwithissuedbook.forEach((each)=>{
    const book=Books.find((Book)=> (Book.Book_no===each.books_issued));
    book.issuedby = each.FirstName;
    book.issueddate =each.issued_date;
    book.returndate =each.return_date;
    issuedbook.push(book);
})
if(issuedbook.length===0){
    return res.status(404).json({
        success:false,
        message:"No book has been issued",
    });
}
return res.status("201").json({
    success:true,
    message:"Book which are issued are",
    data:issuedbook,
});
})


//will print perticular book by bookno. that is given
router.get("/:id",getsinglebook);











// adding element

router.post("/",(req,res)=>{
    const {Book_no,Name,author,genre,price,publisher}=req.body;
    const bookno=Books.find((each)=>each.Book_no===Book_no);
    if(bookno ||!Book_no){
        if(!Book_no){
            return res.status(404).json({
                success: false,
                message:"book no. required",
            });
        }
        return res.status(404).json({
            success: false,
            message:"book with this no is already exist",
        });
    }
    Books.push({Book_no,
        Name,
        author,
        genre,
        price,
        publisher});
    return res.status(201).json({
        success: true,
        message:"Book added successfully",
        data: Books,
    });
})

//updating book details

router.put("/:Book_no",(req,res)=>{
const {Book_no}=req.params;
const {data1}=req.body;
const book=Books.find((each)=> each.Book_no===Book_no);
console.log(book);
if(!data1){
    res.status(404).json({
        success: false,
        message:"no content in your body",
    })
}
if(!book){
    res.status(404).json({
        success: false,
        message:"Book with this Bookno is not found",
    })
}
console.log("id");
const updatebookdetails=Books.map((each)=>{
    if(each.Book_no===Book_no){
        return{
            ...each,
            ...data1
        };
    }
    console.log(each);
    return each;
});

return res.status(201).json({
    success: true,
        message:"Book updated successfully",
        data:updatebookdetails,
})

})


module.exports=router;
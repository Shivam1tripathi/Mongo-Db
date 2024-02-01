const {UserModel,BookModel}=require("../Models/index");
const IssuedBook=require("../DTOs/book-dto");
//get all book
const getallbook=async(req,res)=>{
    const books=await BookModel.find({});
    if(books.length===0){
        return res.status(404).json({
            sucess:false,
            message:"No data found"
        })
    }
    return res.status(201).json({
        sucess:true,
        message:"Here is all the books",
        data:books
    })
};


//to get single book
const getsinglebook=async(req,res)=>{
    const {id}=req.params;
    const book=await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message:"book number not found",
        })
    }

    return res.status(201).json({
        success: true,
        message:"Book found",
        data: book,
    })
    
};

//get all issued book
const allissuedbook=async(req,res)=>{
const users=await UserModel.find({
    IssuedBook:{$exists:true},
}).populate( "IssuedBook");

const issuedbooks=users.map((each)=>new IssuedBook(each));
if(issuedbooks.length===0){
    return res.status(404).json({
        success:false,
        message:"No book has been issued",
    });
}
return res.status(201).json({
    success:true,
    message:"Book which are issued are",
    data:issuedbook,
});
}

//add new book
const addnewbook= async(req,res)=>{
const {data}=req.body;
if(!data){
    return res.status(404).json({
        success:false,
        message:"No data found, Please enter book details"
    })
}
await BookModel.create(data);
const allbooks=await BookModel.find();
return res.status(201).json({
    success:true,
    message:"Book addedsucessfully",
    data:allbooks,
});
}



//update book by id
const updatebookbyid= async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const updatebook=await BookModel.findOneAndUpdate({
        _id:id,
    },
    data,{
        new:true,
    });
    return res.status(201).json({
        success:true,
        message:"Book updated successfully",
        data:updatebook,
    });
}
module.exports={getallbook,getsinglebook,allissuedbook,addnewbook,updatebookbyid};
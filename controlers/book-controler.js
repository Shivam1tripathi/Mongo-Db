const {UserModel,BookModel}=require("../Models/index");
const userModel = require("../Models/user-model");

//get all book
const getallbook=async(req,res)=>{
    const books=await BookModel.find();
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
    const id=req.params;
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
const user=await userModel.find({
    IssuedBook:{$exists:true},
}).populate( "IssuedBook");
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
}


module.exports={getallbook,getsinglebook};
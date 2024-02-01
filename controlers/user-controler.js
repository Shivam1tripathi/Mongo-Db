const {UserModel,BookModel}=require("../Models/index");
const IssuedBook=require("../DTOs/book-dto");
//will print all user
const getAllUsers=async (req,res)=>{
    const users=await UserModel.find({});
    if(users.length===0){
        return res.status(404).json({
            sucess:false,
            message:"No data found"
        })
    }
    return res.status(201).json({
        sucess:true,
        message:"Here is all the users",
        data:users
    })
}

//will print perticular user by id that is given
const getUserbyId=async (req,res)=>{
    const {id}=req.params;
    const user=await UserModel.findById(id);
    if(!user){
       return res.status(404).json({
            success: false,
            message:"user with this id not found",
        });
    }
    
    return res.status(201).json({
        success: true,
        message:"user found",
        data: user,
    });
}


// will adding user

const addUser=async (req,res)=>{
    const {data}=req.body;
    if(!data){
        return res.status(404).json({
            success:false,
            message:"No data found, Please enter users details"
        })
    }
    await UserModel.create(data);
    const allusers=await UserModel.find();
    return res.status(201).json({
        success:true,
        message:"user addedsucessfully",
        data:allusers,
    });
}



//updating data of user

const updateuserbyid=async(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    
    const updateuser=await UserModel.findOneAndUpdate({
        _id:id,
    },
    data,{
        new:true,
    });
    
    return res.status(200).json({
        success:true,
        message:"id updated successful",
        data:updateuser
    });
    }


//deleting user from database
const deleteuserbyid=async(req,res)=>{
    const {id}=req.params;
    const user=await UserModel.deleteOne({_id:id});
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User doesnot exist"
        }); 
    }
    return res.status(200).json({
        success:true,
        message:"User deleted successfully",
        data:user,
    });
}



module.exports={getAllUsers,getUserbyId,addUser,updateuserbyid,deleteuserbyid};
const express=require("express");
const {users} = require("../data/users.json");
const {UserModel,BookModel}=require("../Models/index");
const router=express.Router();
//will print all user
router.get("/",(req,res)=>{
    res.status(201).json({
        success: true,
        data: users,
})
})

//will print perticular user by id that is given
router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);

    if(!user){
       return res.status(404).json({
            success: false,
            message:"id not found",
        });
    }
    
    return res.status(201).json({
        success: true,
        message:"id found",
        data: user,
    });
    
});

// adding element
router.post("/",(req,res)=>{
    const {id,FirstName,SecondName,DOB,email,subscription_type,subscription_date}=req.body;

    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:"False",
            message:"Id is already exist",
        });
    }
    users.push({
        id,
        FirstName,
        SecondName,
        DOB,
        email,
        subscription_type,
        subscription_date,
    });
    return res.status(201).json({
        success:"True",
        message:"User added successfully",
        data:users,
    });
});

//updating data of user
router.put("/:id",(req,res)=>{
const {id}=req.params;
const {data}=req.body;

const user=users.find((each)=>each.id===id);

if(!user){
   return res.status(404).json({
        success: false,
        message:"id not found",
    });
}
const updateuserdetails=users.map((each)=>{
    if(each.id===id){
        return{
            ...each,
            ...data
        };
    }
    return each;
});
return res.status(200).json({
    success:true,
    message:"id updated successful",
    data:updateuserdetails
});
});

//deleting data
router.delete("/:id",(req,res)=>{
const {id}=req.params;
const user=users.find((each)=>each.id===id);
if(!user){
    return res.status(404).json({
         success: false,
         message:"id not found",
     });
 }
 const index=users.indexOf(user);
 users.splice(index,1);
 return res.status(200).json({
    success:true,
    message:"id deleted successfully",
    data:users
 });
});

//all users subscriprion details
router.get("/subscriprion-details/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found",
            })
        }
    
    const getDateinDay=(data="")=>{
        let date;
        if(data===""){
            date=new Date();
        }else{
            date=new Date(data);
        }
        let days=Math.floor(date/(1000*60*60*24));
        return days;
    }

    const subscriprionType=(date)=>{
        if(user.subscription_type=="basic"){
            date=date+30;
        }else  if(user.subscription_type=="standard"){
            date=date+60;
        }else if(user.subscription_type=="premium"){
            date=date+90;
        }
        
        return date;
    }

    

    let returndate=getDateinDay(user.return_date);
    let currentdate=getDateinDay();
    let subscripriondate=getDateinDay(user.subscription_date);
    let subscriprionexpiration=subscriprionType(subscripriondate);
    console.log(returndate);
    console.log(currentdate);
    console.log(subscripriondate);
    console.log(subscriprionexpiration);


    const data={
        ...user,
        subscriptionExpired :subscriprionexpiration<=currentdate,
        daysleftforexpiration:
        subscriprionexpiration<currentdate 
        ? 0
        :subscriprionexpiration-currentdate,
        fine:
        returndate<currentdate
        ?subscriprionexpiration<=currentdate
        ?100
        :50
        :0
    };
    return res.status(201).json({
        success:true,
        message:"subscription detail for user ",
        data,
    });
})
module.exports=router;
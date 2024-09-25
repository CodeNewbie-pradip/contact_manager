const asyncHandler=require("express-async-handler");
const User=require("../models/userModel")
const bcrypt=require("bcrypt");

//@desc Register a user
//@route POST /api/users/registers
//@acess public
const registerUser=asyncHandler(async(req, res)=>{
    const {username, email, password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory!");
    }

    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered!");
    }

    //hash password
    const hashedPassword=await bcrypt.hash(password, 10);
    console.log("hashed Password", hashedPassword);
    res.json({message:"Register The use"});
});

//@desc Login a user
//@route POST /api/users/login
//@acess public
const loginUser=asyncHandler(async(req, res)=>{
    res.json({message:"login the user"});
});

//@desc current a user info
//@route POST /api/users/currentt
//@acess public
const currentUser=asyncHandler(async(req, res)=>{
    res.json({message:"current user info"});
});
module.exports={registerUser, loginUser, currentUser};
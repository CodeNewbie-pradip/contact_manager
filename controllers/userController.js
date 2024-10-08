const asyncHandler=require("express-async-handler");
const User=require("../models/userModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

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
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    });
    console.log(`user created ${user}`);

    if(user){
        res.status(201).json({_id:user.id, email:user.email});
    }else{
        res.status(400);
        throw new Error("user data us not valid");
    }
    res.json({message:"register the user"});
});

//@desc Login a user
//@route POST /api/users/login
//@acess public
const loginUser=asyncHandler(async(req, res)=>{
    const {email, password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all field are mandatory");
    }
    const user=await User.findOne({email});
    //compare password with hashpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const acessToken=jwt.sign({
            user:{
                username:user.username, 
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    );
        res.status(200).json(acessToken);
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc current a user info
//@route POST /api/users/currentt
//@acess private
const currentUser=asyncHandler(async(req, res)=>{
    res.json(req.user);
});
module.exports={registerUser, loginUser, currentUser};
const asyncHandler= require("express-async-handler");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
//@ Register an User
//@ POST method
//@ access public
const userModel = require("../models/userModel");


const registerUser=asyncHandler(async(req,res)=>{
    const {firstName, lastName, email, password}=req.body;
    if(!firstName || !lastName || !email || !password){
        res.status(400);
        throw new Error("FirstName, Lastname, email and password is required!");
    }
    const userExists= await userModel.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error(`User ${userExists.email} already Exists`);
    }
    const hashedPassword= await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const registerUser= await userModel.create({
                        firstName,
                        lastName,
                        email,
                        password:hashedPassword
                    });
    res.status(201).json({message:`User Registered Successfully! User Details:${registerUser}`});
});

//@ Login an User
//@ POST method
//@ access public
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error(" email and password is required!");
    }
    const userExists= await userModel.findOne({email});
    if(userExists && await bcrypt.compare(password,userExists.password)){
        const accessToken= jwt.sign({
            user:{
                id:userExists._id,
                firstname:userExists.firstName,
                email:userExists.email
                }
        },process.env.JWT_SECRET,{expiresIn:"15m"});
        res.status(200).json({message:`User login Successfully!,${accessToken}`})
    }else{
        res.status(401);
        throw new Error(`User Id or password is invalid!`)
    }
    res.json({message:"Login an User"});
});

//@ Dashboard of an User
//@ GET method
//@ access private
const dashboardUser=asyncHandler(async(req,res)=>{
    console.log("Request comes here only after authetication");
    res.status(200).json({message:"USer Authenticaed", data:`${req.user.id}`});
});

module.exports={registerUser,loginUser,dashboardUser}
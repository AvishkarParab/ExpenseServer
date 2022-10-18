const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const loginUser = asyncHandler(async (req,res) =>{
    const {email, password} = req.body;
    console.log('heyy')
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.cookie("EXPTOKEN",generateToken(user.id));
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})




const registerUser = asyncHandler(async (req,res) =>{
    const {name,email,password,gender} = req.body;
    if(!name || !email || !password || !gender){
        res.status(400)
        throw new Error("Incomplete Data, Please add all the data");
    }

    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400)
        throw new Error("User email ID already Exist");
    }
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);

    //create user
    let user = await User.create({
        name,
        email,
        password:hashPassword,
        gender
    });

    if(user){
        res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user.id)

        });
    }else{
        res.status(400)
        throw new Error("Invalid Data")
    }

})

//Generate JWT 
const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

const getMe = asyncHandler(async (req,res) =>{
    const {_id,name,email,gender} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
        gender,
    })

})

const logout = asyncHandler(async (req,res) =>{
    return res
      .clearCookie("EXPTOKEN")
      .status(200)
      .json({ message: "Successfully logged out" });
    })

module.exports ={
    loginUser,
    registerUser,
    getMe,
    logout
}
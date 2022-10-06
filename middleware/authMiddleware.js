const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async(req,res,next)=>{
    let token = req.cookies.EXPTOKEN;
    if(token){
        try {
            //Verify Token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            //GET user from Token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(400)
            throw new Error("Not Authorized User");
        }
    }

    if(!token){
        res.status(400)
            throw new Error("Not Authorized, No Token Found");
    }
})

module.exports = {protect}
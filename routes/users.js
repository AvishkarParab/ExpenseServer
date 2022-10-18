const express = require("express");
const router = express.Router();
const {

    getMe,
    logout,
    loginUser,
    registerUser

} = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware");


//Login Users
router.post("/login",loginUser);

//Register Users
router.post("/register",registerUser);

//GET Single User
router.get("/getMe",protect,getMe);

//LOG OUT the user
router.get("/logout",protect,logout);


module.exports = router;
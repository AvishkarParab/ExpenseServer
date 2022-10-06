var mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
        
    } catch (error) {
        console.log(error);
    }
}

module.exports= connectDB;
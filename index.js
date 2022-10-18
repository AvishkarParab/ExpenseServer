var express = require("express");
var cors = require("cors");
var app = express();
var dotenv = require("dotenv").config();
const connectDB = require("./config/db")
var port = process.env.PORT || 5000;
var Routes = require("./routes/auth.js");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {errorHandler} = require("./middleware/errorHandler");
const router = require("./routes/users");

connectDB();//db connect

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

app.use("/",Routes);
app.get("/", (req, res) => {
    res.send(`app working ` + new Date().toLocaleTimeString());
});

app.use(errorHandler);

app.listen(port,()=>{
    console.log("The server is started " + port);
})
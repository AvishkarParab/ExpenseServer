const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
    detId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Detail"
    },
    time:{
        type:String,
        required:true,
    },
    etype:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    note:{
        type:String,
    },
    amount:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model('Expense',expenseSchema);
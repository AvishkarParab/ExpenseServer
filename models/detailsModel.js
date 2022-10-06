const mongoose = require("mongoose");

const detailSchema = mongoose.Schema({
    recId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Record"
    },
    date:{
        type:Number,
        required:true,
    },
    day:{
        type:String,
        required:true,
    },
    expense:[{
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
    }]
})

module.exports = mongoose.model('Detail',detailSchema);
const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    year:{
        type:Number,
        required:true,
    },
    month:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model('Record',recordSchema);
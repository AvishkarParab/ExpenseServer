const asyncHandler = require("express-async-handler");
const Detail = require("../models/detailsModel");
const Record = require("../models/recordsModel");
const Expense = require("../models/expenseModel");


const addDetail = asyncHandler(async (req,res) =>{
    const {recId,date,day,time,etype,img,category,note,amount} = req.body;
    if(!recId || !date|| !day|| !time|| !etype|| !img|| !category|| !amount){
        res.status(400)
        throw new Error("Incomplete Data, Please add details");
    }
    let exp = {
        time:time,
        etype:etype,
        img:img,
        category:category,
        note:note,
        amount:amount,
    }
    const detail1 = await Detail.findOne({recId,date});
    if(!detail1){
        //create Details
        let detail = await Detail.create({
            recId,
            date,
            day,
            expense:exp,
        });
        if(detail){
            res.status(200).json(detail);
        }else{
            res.status(400)
            throw new Error("No details were created")
        }

    }else{
        if(detail1.date === date){
            let temp = detail1.expense
            temp.push(exp);
            const detail = await Detail.findOneAndUpdate({recId,date},{expense:temp});
            if(detail)
            res.status(200).json(detail);

        }
    }

})

//get Details of specific month
const getDetail = asyncHandler(async(req,res)=>{
    if(!req.params.id){
        res.status(400)
        throw new Error("Enter a Valid ID");
    }
    let expenses = await Detail.findOne({id:req.params.id});
    if(expenses){
        res.status(200).json(expenses)
    }else{
        res.status(400)
        throw new Error("Expense Not Found");
    }


})

//Delete Details of specific month
const deletedetails = asyncHandler(async(req,res)=>{
    if(!req.params.id){
        res.status(400)
        throw new Error("Enter a Valid ID");
    }
    let expenses = await Detail.findByIdAndRemove(req.params.id);
    if(expenses){
        res.status(200).json(expenses)
    }else{
        res.status(400)
        throw new Error("Expense Not Found");
    }


})


module.exports ={
    addDetail,
    getDetail,
    deletedetails
}
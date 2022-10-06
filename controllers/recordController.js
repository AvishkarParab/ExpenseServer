const asyncHandler = require("express-async-handler");
const Record = require("../models/recordsModel");
const Detail = require("../models/detailsModel");
const Expense = require("../models/expenseModel");
const e = require("express");




const addRecord = asyncHandler(async (req,res) =>{
    const {year,month} = req.body;

    if(!year || !month){
        res.status(400)
        throw new Error("Incomplete Data, Please add month and year");
    }

    //If Record Exist then return ID
    const recordExist = await Record.findOne({year,month,uid:req.user.id});
    if(recordExist){
        res.status(200).json({
            id:recordExist.id
        })
    }else{
    //create Record
    let record = await Record.create({
        uid:req.user.id,
        year,
        month
    });

    if(record){
        res.status(200).json({
            id:record.id,
        });
    }else{
        res.status(400)
        throw new Error("Invalid Data")
    }
}

})

const getRecord = asyncHandler(async(req,res)=>{
    const {year,month} = req.query;

    if(!year || !month){
        res.status(400)
        throw new Error("Please Select Year and Month");
    }
    const record = await Record.findOne({year,month,uid:req.user.id});
    if(record){
        const response = await Detail.find({recId:record._id})
        res.status(200).json(response);
    }else{
        res.status(400)
        throw new Error("Record Not Found");
    }


})

const monthlyRate = asyncHandler(async(req,res)=>{
    
    const record = await Record.find({uid:req.user.id});
    var storeid=[];
    var storeyear =[];
    var totalExpense=0,totalProfit=0;
    if(record){
        record.forEach(recElem => {
            storeid.push(recElem.id);
            storeyear.push(recElem.year);
        });

        const unique = [ ...new Set(storeyear)];
        const details = await Detail.find({recId: storeid })
        details.map(elem =>{
            elem.expense.forEach(dd=>{
               if(dd.etype==="expense"){
                totalExpense+=dd.amount;
               }else{
                totalProfit+=dd.amount;
               }
            })
        })
        res.status(200).json({
            expenseRate:Number((totalExpense/totalProfit).toFixed(2)),
            monthlyExpense:totalExpense/record.length,
            annualExpense:totalExpense/unique.length,
            monthlyProfit:totalProfit/record.length,
            annualProfit:totalProfit/unique.length,
        });
    }else{
        res.status(400)
        throw new Error("Record Not Found");
    }


})

module.exports ={
    addRecord,
    getRecord,
    monthlyRate,
}
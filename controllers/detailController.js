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
const deleteDetail = asyncHandler(async(req,res)=>{
    if(!req.query.rec || !req.query.exp){
        res.status(400)
        throw new Error("Enter a Valid ID");
    }
    let record = await Detail.findById(req.query.rec);
    let expFlag=false;
    let removeIndex;
    if(record){
        record.expense.forEach((expense,index) => {
            if(expense.id === req.query.exp){
                expFlag=true;
                removeIndex=index;
            }
        });

        if(!expFlag)
           { throw new Error("Expense not found")}

        const upExp = record.expense.splice(removeIndex,1);

        let updateRecord;
        if(record.expense.length<=0){
            updateRecord = await Detail.deleteOne(
                {_id:req.query.rec}
             )
        }else{
            updateRecord = await Detail.updateOne(
                {_id:req.query.rec},
                {expense:record.expense}
            )
        }   

       if(updateRecord)
        res.status(200).json("Expense deleted successfully")
       else
        throw new Error("Expense not deleted");
            
    }else{
        res.status(400)
        throw new Error("Record Not Found");
    }


})

//Delete Details of specific month
const updateDetail = asyncHandler(async(req,res)=>{

    if(!req.query.rec || !req.query.exp){
        res.status(400)
        throw new Error("Enter a Valid ID");
    }

    const {recId,date,day,time,etype,img,category,note,amount} = req.body;
    if(!recId || !date|| !day|| !time|| !etype|| !img|| !category|| !amount){
        res.status(400)
        throw new Error("Incomplete Data, Please add details");
    }

    let record = await Detail.findById(req.query.rec);
    let expFlag=false;
    if(record){
        record.expense.forEach((expense,index) => {
            if(expense.id === req.query.exp){
                expense.time=time
                expense.etype=etype
                expense.img=img
                expense.note=note
                expense.category=category
                expense.amount=amount
                expFlag=true;
            }
        });
        // res.status(200).json(record.expense)
        if(!expFlag)
           { throw new Error("Expense not found")}

        const updateRecord = await Detail.updateOne(
                {_id:req.query.rec},
                {expense:record.expense}
            )
        

       if(updateRecord)
        res.status(200).json("Expense Updated successfully")
       else
        throw new Error("Expense not updated");
            
    }else{
        res.status(400)
        throw new Error("Record Not Found");
    }


})


module.exports ={
    addDetail,
    getDetail,
    deleteDetail,
    updateDetail
}
const express = require("express");
const router = express.Router();
const {
    addRecord,
    getRecord,
    monthlyRate

} = require("../controllers/recordController")
const {protect} = require("../middleware/authMiddleware");

//ADD Record
router.post("/add-record",protect,addRecord);

//GET Record
router.get("/get",protect,getRecord);

//GET Monthly expense Rate
router.get("/data",protect,monthlyRate);


module.exports = router;
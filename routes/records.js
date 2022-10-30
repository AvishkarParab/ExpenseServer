const express = require("express");
const router = express.Router();
const {
    addRecord,
    getRecord,
    monthlyRate

} = require("../controllers/recordController")
const {protect} = require("../middleware/authMiddleware");

//ADD Record
router.post("/add-record",addRecord);

//GET Record
router.get("/get",getRecord);

//GET Monthly expense Rate
router.get("/data",monthlyRate);


module.exports = router;
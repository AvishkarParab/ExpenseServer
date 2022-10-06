const express = require("express");
const router = express.Router();
const {
    addDetail,
    getDetail,
    deletedetails

} = require("../controllers/detailController");
const {protect} = require("../middleware/authMiddleware");


//ADD Detail
router.post("/add",addDetail);

//GET Detail
router.get("/get/:id",getDetail);


//GET Detail
router.delete("/delete/:id",deletedetails);



module.exports = router;
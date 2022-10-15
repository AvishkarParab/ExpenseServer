const express = require("express");
const router = express.Router();
const {
    addDetail,
    getDetail,
    deleteDetail,
    updateDetail

} = require("../controllers/detailController");
const {protect} = require("../middleware/authMiddleware");


//ADD Detail
router.post("/add",addDetail);

//GET Detail
router.get("/get/:id",getDetail);


//DELETE Detail
router.delete("/delete",deleteDetail);

//UPDATE Detail
router.put("/update",updateDetail);



module.exports = router;
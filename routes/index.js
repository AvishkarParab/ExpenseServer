const express = require("express");
const router = express.Router();
const users = require("./users");
const records = require("./records");
const details = require("./details");


router.use("/users",users);
router.use("/records",records);
router.use("/details",details);


module.exports = router;
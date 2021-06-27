/**
 * @author canberk.anar
 */

"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const RentalController = require("../controllers/rental")


router.get("/", RentalController.list);
router.post("/", RentalController.create);



module.exports = router;
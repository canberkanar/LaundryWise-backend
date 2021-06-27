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
router.put("/:id", RentalController.give_feedback_to_rental);


module.exports = router;
/**
 * @author canberk.anar
 */

"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const RentalController = require("../controllers/rental")

// TODO replace with these when done with development
// router.post("/", middlewares.checkAuthentication, RentalController.create);
// router.put("/:id", middlewares.checkAuthentication, RentalController.give_feedback_to_rental);


router.get("/", RentalController.list);
router.post("/", RentalController.create);
router.put("/:id", RentalController.give_feedback_to_rental);


module.exports = router;
"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const RentalController = require("../controllers/rental")

// TODO replace with these when done with development
// router.post("/", middlewares.checkAuthentication, RentalController.create);
// router.put("/:id", middlewares.checkAuthentication, RentalController.give_feedback_to_rental);


router.post("/myRentals", RentalController.getAllRentalsUser);
router.get("/all", RentalController.list);
router.post("/new", RentalController.create);
router.get("/:id", RentalController.get);
router.delete("/:id", RentalController.remove);
router.put("/:id", RentalController.give_feedback_to_rental);


module.exports = router;
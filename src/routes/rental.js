"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const RentalController = require("../controllers/rental")

// TODO replace with these when done with development
// router.post("/", middlewares.checkAuthentication, RentalController.create);
// router.put("/:id", middlewares.checkAuthentication, RentalController.give_feedback_to_rental);


router.get("/all", RentalController.list);
router.post("/all/me", RentalController.getAllRentalsUser);
router.post("/", RentalController.create);
router.get("/:id", RentalController.get);
router.delete("/:id", RentalController.remove);
router.put("/:id", RentalController.give_feedback_to_rental);


module.exports = router;
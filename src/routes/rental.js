"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const RentalController = require("../controllers/rental")


router.get("/all", RentalController.list);
router.post("/", RentalController.create);
router.get("/:id", RentalController.get);
router.put("/:id", RentalController.update);
router.delete("/:id", RentalController.remove);
router.put("/:id", RentalController.give_feedback_to_rental);


module.exports = router;
"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const MachineController = require("../controllers/machine")

router.get("/all", MachineController.list);
router.post("/", MachineController.create);
router.get("/", MachineController.get);
router.put("/update/:id", MachineController.update);
router.post("/remove", MachineController.remove);
router.put("/update_price/:id", MachineController.update_machine_price);

module.exports = router;
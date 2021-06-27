"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const MachineController = require("../controllers/machine")

router.get("/all", MachineController.list);
router.post("/", MachineController.create);
router.get("/", MachineController.get);
router.put("/update", MachineController.update);
router.post("/remove", MachineController.remove);
module.exports = router;
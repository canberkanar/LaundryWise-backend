"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const MachineController = require("../controllers/machine")

router.get("/", MachineController.list);

module.exports = router;
"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const StatisticsController = require("../controllers/statistics")


router.get("/", StatisticsController.getStatistics);


module.exports = router;
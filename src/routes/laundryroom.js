"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const LaundryController = require("../controllers/laundryroom")

router.get("/laundryroom/:id", LaundryController.read);

module.exports = router;
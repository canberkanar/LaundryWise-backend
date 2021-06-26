"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const LaundryController = require("../controllers/laundryroom")

router.get("/", LaundryController.list);
router.post("/", LaundryController.create);



module.exports = router;
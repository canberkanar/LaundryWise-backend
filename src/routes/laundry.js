"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");

router.get("/laundryroom/:id",middlewares.checkAuthentication);

module.exports = router;
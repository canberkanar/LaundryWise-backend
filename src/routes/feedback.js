"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const FeedbackController = require("../controllers/feedback")

router.get("/all", FeedbackController.list);
router.post("/", FeedbackController.create);
router.get("/", FeedbackController.get);
router.get("/update", FeedbackController.update);

module.exports = router;
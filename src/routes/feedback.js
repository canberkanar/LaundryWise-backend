"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const FeedbackController = require("../controllers/feedback")

router.get("/all", FeedbackController.list);
router.post("/", FeedbackController.create);
router.get("/", FeedbackController.get);
router.put("/update", FeedbackController.update);
router.post("/remove", FeedbackController.remove);
module.exports = router;
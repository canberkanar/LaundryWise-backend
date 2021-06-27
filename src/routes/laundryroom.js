"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const LaundryController = require("../controllers/laundryroom")

router.get("/", LaundryController.list);
router.get("/:id", LaundryController.read);
router.put("/:id", LaundryController.update);
router.post("/", LaundryController.create);
router.delete("/:id", LaundryController.remove)


module.exports = router;
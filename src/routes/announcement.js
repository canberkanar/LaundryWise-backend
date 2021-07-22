"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const AnnouncementController = require("../controllers/announcement")

router.post("/", AnnouncementController.getAnnouncement);
router.get("/all", AnnouncementController.list);
router.get("/", AnnouncementController.read);
router.put("/", AnnouncementController.update);
router.post("/new", AnnouncementController.create);
router.delete("/:id", AnnouncementController.remove);

module.exports = router;
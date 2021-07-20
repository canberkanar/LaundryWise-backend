"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const LaundryController = require("../controllers/laundryroom")

// // TODO replace with these when done with development
// router.put("/updateWorkingHours/", middlewares.checkAuthentication,
//     middlewares.checkIsServiceProvider, LaundryController.updateWorkingHours);
// router.put("/:id", middlewares.checkAuthentication,
//     middlewares.checkIsServiceProvider, LaundryController.update);
// router.post("/", middlewares.checkAuthentication,
//     middlewares.checkIsServiceProvider, LaundryController.create);
// router.delete("/:id", middlewares.checkAuthentication,
//     middlewares.checkIsServiceProvider, LaundryController.remove);

router.put("/updateWorkingHours/", LaundryController.updateWorkingHours);
router.get("/get", LaundryController.get);
router.get("/", LaundryController.list);
router.get("/filter", LaundryController.read);
router.put("/:id", LaundryController.update);
router.post("/", LaundryController.create);
router.delete("/:id", LaundryController.remove);

module.exports = router;
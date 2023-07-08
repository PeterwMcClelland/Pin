const express = require("express");
const router = express.Router();
const Spot = require("../models/Spots");
const spotsController = require("../controllers/spots-controller");

router.get("/", spotsController.getAllSpots);
router.post("/", spotsController.addSpot);
router.get("/:id", spotsController.getById);
router.put("/:id", spotsController.updateSpot);
router.delete("/:id", spotsController.deleteSpot);

module.exports = router;

const express = require("express");
const router = express.Router();
const spotsController = require("../controllers/spots-controller");
const authController = require("../controllers/auth-controller");

router.get("/", spotsController.getAllSpots);
router.post("/", spotsController.addSpot);
router.get("/:id", spotsController.getById);
router.put("/:id", spotsController.updateSpot);
router.delete("/:id", spotsController.deleteSpot);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

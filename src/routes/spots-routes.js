import express from 'express';
import { getAllSpots, addSpot, getById, updateSpot, deleteSpot } from "../controllers/spots-controller.js";
import { register, login } from "../controllers/auth-controller.js";

const router = express.Router();

router.get("/", getAllSpots);
router.post("/", addSpot);
router.get("/:id", getById);
router.put("/:id", updateSpot);
router.delete("/:id", deleteSpot);

router.post("/register", register);
router.post("/login", login);

export default router;


import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect, requireSelfOrAdmin } from "../middlewares/auth.js";
import { getUserValidator, updateUserValidator } from "../validators/userValidators.js";
import { validate } from "../validators/validate.js";

const router = express.Router();

router.get("/:id", getUserValidator, validate, getUserProfile);
router.put("/:id", protect, requireSelfOrAdmin, updateUserValidator, validate, updateUserProfile);

export default router;

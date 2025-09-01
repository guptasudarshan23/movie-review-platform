import express from "express";
import { createReviewForMovie, getReviewsForMovie } from "../controllers/reviewController.js";
import { protect } from "../middlewares/auth.js";
import { createReviewValidator, listReviewsValidator } from "../validators/reviewValidators.js";
import { validate } from "../validators/validate.js";

const router = express.Router({ mergeParams: true });

// /api/movies/:id/reviews
router.get("/", listReviewsValidator, validate, getReviewsForMovie);
router.post("/", protect, createReviewValidator, validate, createReviewForMovie);

export default router;

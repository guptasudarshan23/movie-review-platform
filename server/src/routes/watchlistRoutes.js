import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controllers/watchlistController.js";
import { protect, requireSelfOrAdmin } from "../middlewares/auth.js";
import { body, param } from "express-validator";
import { validate } from "../validators/validate.js";

const router = express.Router({ mergeParams: true });

// /api/users/:id/watchlist
router.get("/", protect, requireSelfOrAdmin, getWatchlist);

router.post("/",
    protect,
    requireSelfOrAdmin,
    body("movieId").isMongoId().withMessage("movieId required"),
    validate,
    addToWatchlist
);

router.delete("/:movieId",
    protect,
    requireSelfOrAdmin,
    param("movieId").isMongoId(),
    validate,
    removeFromWatchlist
);

export default router;

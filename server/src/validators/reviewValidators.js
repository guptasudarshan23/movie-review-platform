import { body, param, query } from "express-validator";

export const createReviewValidator = [
    param("id").isMongoId(),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating 1..5 required"),
    body("reviewText").optional().isString().isLength({ max: 2000 })
];

export const listReviewsValidator = [
    param("id").isMongoId(),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 })
];
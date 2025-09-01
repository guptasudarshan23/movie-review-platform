import { body, query } from "express-validator";

export const createMovieValidator = [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("genres").isArray({ min: 1 }).withMessage("Genres must be a non-empty array"),
    body("releaseYear").isInt({ min: 1888 }).withMessage("Valid releaseYear required")
];

// Get /movies we parse filters via query (no errors if missing)
export const listMoviesQueryValidator = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 })
];
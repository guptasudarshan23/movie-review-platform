import express from "express";
import Movie from "../models/Movie.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Get all movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get single movie
router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Add new movie (only logged in users)
router.post("/", protect, async (req, res) => {
    try {
        const {
            title,
            genres,
            releaseYear,
            director,
            cast,
            synopsis,
            posterUrl,
        } = req.body;

        const movie = new Movie({
            title,
            genres,
            releaseYear,
            director,
            cast,
            synopsis,
            posterUrl,
        });

        const createdMovie = await movie.save();
        res.status(201).json(createdMovie);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;

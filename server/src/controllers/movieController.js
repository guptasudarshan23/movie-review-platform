import Movie from '../models/Movie.js';
import Review from '../models/Review.js';

export const getMovies = async (req, res) => {
    const {
        page = 1, limit = 12, search, genre, year, ratingMin, ratingMax, sort } = req.query;

    const filter = {};

    if (search)
        filter.title = { $regex: search, $options: "i" };
    if (genre) {
        const genres = Array.isArray(genre) ? genre : genre.split(",").map(g => g.trim());
        filter.genres = { $in: genres };
    }

    if (year) {
        // 2012 or 2000-2010
        if (String(year).includes("-")) {
            const [from, to] = String(year).split("-").map(Number);
            filter.releaseYear = {};
            if (!isNaN(from))
                filter.releaseYear.$gte = from;
            if (!isNaN(to))
                filter.releaseYear.$lte = to;
        } else {
            filter.releaseYear = Number(year);
        }
    }
    if (ratingMin || ratingMax) {
        filter.averageRating = {};
        if (ratingMin)
            filter.averageRating.$gte = Number(ratingMin);
        if (ratingMax)
            filter.averageRating.$lte = Number(ratingMax);
    }

    const sortMap = {
        rating: { averageRating: -1 },
        year: { releaseYear: -1 },
        title: { title: 1 },
        "-title": { title: -1 }
    };

    let sortBy = sortMap[sort] || { createdAt: -1 };
    if (!sortMap[sort] && typeof sort === "string") {
        const s = {};
        const key = sort.replace("-", "");
        s[key] = sort.startsWith("-") ? -1 : 1;
        sortBy = s;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const [data, total] = await Promise.all([
        Movie.find(filter).sort(sortBy).skip((pageNum - 1) * limitNum).limit(limitNum),
        Movie.countDocuments(filter)
    ]);

    res.json({
        data,
        page: pageNum,
        total,
        totalPages: Math.ceil(total / limitNum)
    });
};

export const getMovieById = async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie)
        return res.status(404).json({ message: "Movie not found" });

    // latest 10 reviews
    const reviews = await Review.find({ movie: id }).populate("user", "username profilePic").sort({ createdAt: -1 }).limit(10);

    res.json({ movie, reviews });
};

export const createMovie = async (req, res) => {
    const { title, genres, releaseYear, director, cast, synopsis, posterUrl } = req.body;
    const movie = await Movie.create({
        title, genres, releaseYear, director, cast, synopsis, posterUrl
    });
    res.status(201).json(movie);
}
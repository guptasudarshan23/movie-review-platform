import Review from "../models/Review.js";
import Movie from "../models/Movie.js";

const recalcMovieRating = async (movieId) => {
    const stats = await Review.aggregate([
        { $match: { movie: movieId } },
        { $group: { _id: "$movie", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    const avg = stats[0]?.avg ?? 0;
    const count = stats[0]?.count ?? 0;
    await Movie.findByIdAndUpdate(movieId, {
        averageRating: Number(avg.toFixed(2)),
        reviewCount: count
    });
};

export const getReviewsForMovie = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Number(page), limitNum = Number(limit);

    const [reviews, total] = await Promise.all([
        Review.find({ movie: id })
            .populate("user", "username profilePic")
            .sort({ createdAt: -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum),
        Review.countDocuments({ movie: id })
    ]);

    res.json({
        data: reviews,
        page: pageNum,
        total,
        totalPages: Math.ceil(total / limitNum)
    });
};

export const createReviewForMovie = async (req, res) => {
    const { id } = req.params;          // movieId
    const { rating, reviewText } = req.body;

    try {
        const review = await Review.create({
            user: req.user._id,
            movie: id,
            rating,
            reviewText: reviewText || ""
        });

        await recalcMovieRating(review.movie);

        const populated = await review.populate("user", "username profilePic");
        res.status(201).json(populated);
    } catch (err) {
        // handle duplicate (unique user+movie)
        if (err?.code === 11000) {
            return res.status(400).json({ message: "You have already reviewed this movie" });
        }
        throw err;
    }
};

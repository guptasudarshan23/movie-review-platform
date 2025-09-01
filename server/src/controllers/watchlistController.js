import Watchlist from "../models/Watchlist.js";

export const getWatchlist = async (req, res) => {
    const { id } = req.params; // userId
    const items = await Watchlist.find({ user: id })
        .sort({ createdAt: -1 })
        .populate("movie", "title posterUrl releaseYear genres averageRating");
    res.json(items);
};

export const addToWatchlist = async (req, res) => {
    const { id } = req.params; // userId
    const { movieId } = req.body;

    try {
        const item = await Watchlist.create({ user: id, movie: movieId });
        const populated = await item.populate("movie", "title posterUrl releaseYear genres averageRating");
        res.status(201).json(populated);
    } catch (err) {
        if (err?.code === 11000) {
            return res.status(200).json({ message: "Already in watchlist" });
        }
        throw err;
    }
};

export const removeFromWatchlist = async (req, res) => {
    const { id, movieId } = req.params; // userId, movieId
    const item = await Watchlist.findOneAndDelete({ user: id, movie: movieId });
    if (!item) return res.status(404).json({ message: "Not found in watchlist" });
    res.json({ message: "Removed from watchlist" });
};

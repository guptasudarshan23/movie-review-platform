import User from "../models/User.js";
import Review from "../models/Review.js";

export const getUserProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const reviews = await Review.find({ user: id })
        .populate("movie", "title posterUrl releaseYear")
        .sort({ createdAt: -1 });

    res.json({ user, reviews });
};

export const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.profilePic) updates.profilePic = req.body.profilePic;

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
};

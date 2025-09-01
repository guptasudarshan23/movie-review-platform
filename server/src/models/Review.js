import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
            index: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        reviewText: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
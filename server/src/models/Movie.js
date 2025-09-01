import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: true
        },
        genres: [
            {
                type: String,
                index: true
            }
        ],
        releaseYear: {
            type: Number,
            index: true
        },
        director: {
            type: String,
            default: ""
        },
        cast: [
            {
                type: String
            }
        ],
        synopsis: {
            type: String,
            default: ""
        },
        posterUrl: {
            type: String,
            default: ""
        },
        averageRating: {
            type: Number,
            default: 0
        },
        reviewCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

movieSchema.index({ title: "text", director: "text", synopsis: "text" });

export default mongoose.model("Movie", movieSchema);

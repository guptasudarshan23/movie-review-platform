// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    const poster =
        movie.posterUrl ||
        movie.poster ||
        "https://via.placeholder.com/300x450?text=No+Poster";

    const title = movie.title || movie.name || "Untitled";
    const genres = movie.genres ? movie.genres.join(", ") : (movie.genre || "");

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-105 transition transform duration-200">
            <Link to={`/movie/${movie._id}`}>
                <img
                    src={poster}
                    alt={title}
                    className="w-full h-64 object-cover"
                />
            </Link>
            <div className="p-3">
                <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-600 line-clamp-1">{genres}</p>
                <div className="mt-2 flex justify-between items-center">
                    <Link
                        to={`/movie/${movie._id}`}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                    >
                        View
                    </Link>
                    <div className="text-sm text-yellow-500">
                        {movie.averageRating
                            ? `⭐ ${movie.averageRating.toFixed(1)}`
                            : "No ratings yet"}
                    </div>
                </div>
            </div>
        </div>
    );
}

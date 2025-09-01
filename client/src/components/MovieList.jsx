// src/components/MovieList.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/movies");

                if (!res.ok) throw new Error("Failed to fetch movies");
                const data = await res.json();
                setMovies(data);
            } catch (err) {
                console.error(err);
                setError("Could not load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div className="text-center py-8">Loading movies...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Now Showing 🎬</h2>
            {movies.length === 0 ? (
                <p className="text-gray-600">No movies available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}

// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await API.get("/movies");
                // backend may return { data, page, ... } or an array
                const payload = res.data.data ?? res.data;
                setMovies(payload);
            } catch (err) {
                console.error("Failed to load movies", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-4">Trending & Latest</h1>
            {loading ? (
                <p>Loading movies...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
                </div>
            )}
        </div>
    );
}

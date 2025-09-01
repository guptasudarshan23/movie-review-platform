// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

function Review({ r }) {
    return (
        <div className="bg-gray-100 p-3 rounded">
            <div className="flex items-center justify-between">
                <strong>{r.user?.username ?? r.user?.name ?? "User"}</strong>
                <span>⭐ {r.rating}</span>
            </div>
            <p className="text-sm mt-2">{r.reviewText || r.comment || ""}</p>
        </div>
    );
}

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    // review form state
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchMovie = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/movies/${id}`);
            // controller earlier returned { movie, reviews }
            if (res.data.movie) {
                setMovie(res.data.movie);
                setReviews(res.data.reviews ?? []);
            } else {
                // fallback: if backend returned movie object directly
                setMovie(res.data);
                setReviews(res.data.reviews ?? []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
        // eslint-disable-next-line
    }, [id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
            return;
        }
        setSubmitting(true);
        try {
            await API.post(`/movies/${id}/reviews`, { rating: Number(rating), reviewText });
            // re-fetch movie + reviews so averageRating updates
            await fetchMovie();
            setRating(5);
            setReviewText("");
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to submit review";
            alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !movie) return <p>Loading movie...</p>;

    return (
        <div className="py-6">
            <div className="flex gap-6">
                <img src={movie.posterUrl || movie.poster || "/placeholder-poster.png"} alt={movie.title} className="w-56 h-80 object-cover rounded" />
                <div>
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-sm text-gray-600 mt-2">{movie.genres?.join?.(", ") ?? movie.genres ?? ""}</p>
                    <p className="mt-3 text-gray-700">{movie.synopsis || movie.description || ""}</p>
                    <div className="mt-3">
                        <span className="text-yellow-500">⭐ {movie.averageRating ?? "--"}</span>
                        <span className="ml-4 text-sm text-gray-600">{movie.reviewCount ? `${movie.reviewCount} reviews` : ""}</span>
                    </div>
                </div>
            </div>

            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-3">
                    {reviews.length ? reviews.map((r) => <Review key={r._id || r.createdAt} r={r} />) : <p>No reviews yet.</p>}
                </div>
            </section>

            <section className="mt-6">
                <h3 className="text-lg font-semibold">Write a review</h3>
                <form onSubmit={handleSubmitReview} className="mt-3 max-w-md">
                    <label className="block mb-1">Rating</label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} className="border p-2 rounded w-32">
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Poor</option>
                        <option value={1}>1 - Terrible</option>
                    </select>

                    <label className="block mt-3 mb-1">Review</label>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full border rounded p-2" rows={4} />

                    <div className="mt-3">
                        <button type="submit" disabled={submitting} className="bg-red-600 text-white px-4 py-2 rounded">
                            {submitting ? "Posting..." : "Post Review"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        const load = async () => {
            try {
                const res = await API.get(`/users/${user._id}`);
                // controller earlier returned { user, reviews }
                if (res.data.user) {
                    setProfile(res.data.user);
                    setReviews(res.data.reviews ?? []);
                } else {
                    setProfile(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        load();
        // eslint-disable-next-line
    }, [user]);

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <div className="mt-4 bg-white p-4 rounded shadow max-w-xl">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Joined:</strong> {new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>

            <section className="mt-6">
                <h2 className="text-xl font-semibold">Your Reviews</h2>
                <div className="mt-3 space-y-3">
                    {reviews.length ? reviews.map(r => (
                        <div key={r._id} className="bg-gray-100 p-3 rounded">
                            <div className="flex justify-between">
                                <strong>{r.movie?.title ?? "—"}</strong>
                                <span>⭐ {r.rating}</span>
                            </div>
                            <p className="text-sm mt-2">{r.reviewText}</p>
                        </div>
                    )) : <p>No reviews yet.</p>}
                </div>
            </section>
        </div>
    );
}

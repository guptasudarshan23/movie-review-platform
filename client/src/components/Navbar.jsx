// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-purple-500 text-white p-4 shadow">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold">🎬 MovieZone</Link>
                <div className="flex items-center gap-4">
                    <Link to="/">Home</Link>
                    {user ? (
                        <>
                            <Link to={`/profile`}>{user.username}</Link>
                            <button onClick={handleLogout} className="bg-white text-red-600 px-3 py-1 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

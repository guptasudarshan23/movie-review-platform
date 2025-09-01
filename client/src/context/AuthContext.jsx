// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { _id, username, email }
    const [token, setToken] = useState(null);

    useEffect(() => {
        const raw = localStorage.getItem("auth");
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setUser(parsed.user || null);
                setToken(parsed.token || null);
                if (parsed.token) setAuthToken(parsed.token);
            } catch (err) {
                localStorage.removeItem("auth");
            }
        }
    }, []);

    const login = (data) => {
        // expects server response: { _id, username, email, token }
        const userObj = { _id: data._id, username: data.username, email: data.email };
        setUser(userObj);
        setToken(data.token);
        setAuthToken(data.token);
        localStorage.setItem("auth", JSON.stringify({ user: userObj, token: data.token }));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setAuthToken(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

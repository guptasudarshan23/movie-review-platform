import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const auth = req.headers.authorization || "";
        const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
        if (!token)
            return res.status(401).json({ message: "Not authorized, no token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user)
            return res.status(401).json({ message: "Not authorized " });

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, token invalid" });
    }
};

export const requireAdmin = (req, res, next) => {
    if (req.user?.role === "admin")
        return next();
    return res.status(403).json({ message: "Admin only" })
};

export const requireSelfOrAdmin = (req, res, next) => {
    if (req.user?.role === "admin" || req.user?._id?.toString() === req.params.id)
        return next();
    return res.status(403).json({ message: "Forbidden" });
}
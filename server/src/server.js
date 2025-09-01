import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from './config/db.js';
import path from "path";
import { fileURLToPath } from "url";

import { notFound, errorHandler } from "./middlewares/error.js";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: process.env.CORS_ORIGIN ? true : false
}));
app.use(morgan("dev"));
app.use(express.json());

// Rate limiters
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const writeLimiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 30 });

// Routes
app.get("/", (req, res) => res.send("Movie API running"));
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/movies/:id/reviews", writeLimiter, reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/:id/watchlist", watchlistRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;

await connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


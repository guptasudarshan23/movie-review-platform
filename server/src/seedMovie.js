import mongoose from "mongoose";
import dotenv from "dotenv";
import Movie from "./models/Movie.js";

dotenv.config();

async function seedMovies() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Movie.deleteMany(); // clear old movies (optional)

        await Movie.create([
            {
                title: "Inception",
                description: "A mind-bending thriller",
                poster: "https://m.media-amazon.com/images/I/51s+4TbHjXL._AC_.jpg",
                releaseDate: "2010-07-16"
            },
            {
                title: "Interstellar",
                description: "A space exploration epic",
                poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
                releaseDate: "2014-11-07"
            },
            {
                title: "The Dark Knight",
                description: "Batman faces Joker in Gotham",
                poster: "https://m.media-amazon.com/images/I/51k0qa3zRjL._AC_.jpg",
                releaseDate: "2008-07-18"
            }
        ]);

        console.log("Movies seeded ✅");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedMovies();

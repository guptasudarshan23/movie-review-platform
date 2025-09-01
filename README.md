Movie Review Platform (MERN)

A full-stack movie review platform built with the MERN stack (MongoDB, Express, React, Node.js).
Users can sign up, log in, browse movies, and post reviews.

🚀 Features

🔐 Authentication (Login / Signup with JWT)

🎥 Movies Listing (fetch movies from backend)

📝 Add Reviews for movies

👤 User Profile

📱 Responsive Design

🛠️ Tech Stack

Frontend

React.js

Axios

Tailwind CSS / CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

📂 Project Structure
movie-review-platform/
│── client/         # Frontend (React)
│── server/         # Backend (Express + MongoDB)
│── .gitignore
│── README.md

⚙️ Installation & Setup

Clone the repo

git clone https://github.com/your-username/movie-review-platform.git
cd movie-review-platform


Backend Setup

cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_secret_key
npm run dev


Frontend Setup

cd client
npm install
npm start


Visit 👉 http://localhost:3000

📸 Screenshots (Optional)

(Add screenshots of login page, movie cards, reviews, etc.)

📝 Future Improvements

⭐ Movie rating system

🔍 Search & filter movies

📊 Admin dashboard

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

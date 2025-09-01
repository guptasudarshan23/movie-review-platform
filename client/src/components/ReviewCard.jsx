export default function ReviewCard({ review }) {
    return (
        <div className="bg-gray-100 p-3 rounded-lg shadow">
            <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
            <p className="text-sm text-gray-700">{review.comment}</p>
            <p className="text-yellow-500">⭐ {review.rating}</p>
        </div>
    );
}

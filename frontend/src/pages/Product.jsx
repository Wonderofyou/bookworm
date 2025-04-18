import { useState } from "react";
import { Star, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const fakeBook = {
  id: 1,
  title: "Book Title",
  author: "Anna Banks",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image: "/api/placeholder/300/400",
  rating: 4.6,
  reviewsCount: 1314,
  price: 29.99,
  originalPrice: 49.99,
  reviews: Array(5).fill({
    title: "Amazing Story! You will LOVE it",
    content:
      "Such an incredibly complex story! I had to buy it because there was a waiting list of 30+ at the local library for this book. Thrilled that I made the purchase",
    date: "April 12, 2021",
    rating: 5,
  }),
};

export default function BookDetail() {
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ title: "", content: "", rating: 5 });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Category Header */}
      <h1 className="text-lg font-medium mb-6">Category Name</h1>

      {/* Book Info and Purchase Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-b py-6">
        <div className="md:col-span-3 flex gap-6">
          {/* Book Image */}
          <div className="w-1/4 bg-gray-400 rounded overflow-hidden">
            <img src={fakeBook.image} alt={fakeBook.title} className="w-full object-cover" />
          </div>

          {/* Book Details */}
          <div className="w-3/4 space-y-2">
            <h2 className="text-xl font-semibold">{fakeBook.title}</h2>
            <p className="text-sm text-gray-700">{fakeBook.description}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>"The multi-million copy bestseller"</p>
              <p>"Soon to be a major film"</p>
              <p>"A Number One New York Times Bestseller"</p>
            </div>
            <p className="text-sm text-gray-500">By (author) <span className="font-medium">{fakeBook.author}</span></p>

            <div className="text-sm text-gray-600 space-y-1 mt-4">
              <p>"Frankly beautiful" New York Times</p>
              <p>"Unforgettable... as engrossing as it is moving" Daily Mail</p>
              <p>"I can't recommend The Times"</p>
              <p>"I can't even express how much I love this book!" Reese Witherspoon</p>
            </div>
          </div>
        </div>

        {/* Price and Purchase */}
        <div className="md:col-span-1 space-y-6">
          {/* Price */}
          <div className="bg-gray-100 p-4 rounded">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400 line-through">${fakeBook.originalPrice.toFixed(2)}</span>
              <span className="text-xl font-bold">${fakeBook.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-sm mb-2">Quantity</p>
            <div className="flex border rounded">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-1 border-r"
              >
                <Minus size={16} />
              </button>
              <div className="px-6 py-1 flex-grow text-center">{quantity}</div>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-1 border-l">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <Link to="/cart" className="block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
              Add to cart
            </button>
          </Link>
        </div>
      </div>

      {/* Reviews Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {/* Customer Reviews */}
        <div className="md:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Customer Reviews <span className="font-normal text-sm">(Filtered by 5 stars)</span></h2>

          {/* Rating Summary */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{fakeBook.rating}</span>
              <span className="font-semibold">Star</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(fakeBook.rating) ? "currentColor" : "none"}
                    strokeWidth={1}
                  />
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              ({fakeBook.reviewsCount})
              <span className="flex space-x-2 mt-1">
                <a href="#" className="hover:underline">1 star (20)</a>
                <a href="#" className="hover:underline">2 star (30)</a>
                <a href="#" className="hover:underline">3 star (200)</a>
                <a href="#" className="hover:underline">4 star (361)</a>
                <a href="#" className="hover:underline">5 star (705)</a>
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <p>Showing 1-12 of {fakeBook.reviewsCount} reviews</p>
              <div className="flex gap-2">
                <select className="border p-1 rounded text-sm">
                  <option>Sort by top rated</option>
                  <option>Sort by date: newest to oldest</option>
                  <option>Sort by date: oldest to newest</option>
                </select>
                <select className="border p-1 rounded text-sm">
                  <option>Show 20</option>
                  <option>Show 50</option>
                  <option>Show 100</option>
                </select>
              </div>
            </div>
          </div>

          {/* Review Title Template */}
          <div className="border-b pb-2 mb-4">
            <h3 className="font-semibold">Review Title <span className="text-yellow-500 font-normal">(5 stars)</span></h3>
            <p className="text-sm text-gray-700 my-2">Review content. Lorem ipsum dolor sit amet, consectetur tempor incididunt ut labore et dolore magna aliqua.</p>
            <p className="text-xs text-gray-400">March 10th, 2021</p>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {fakeBook.reviews.map((review, i) => (
              <div key={i} className="border-b pb-4">
                <h3 className="font-semibold">{review.title} <span className="text-yellow-500 font-normal">({review.rating} stars)</span></h3>
                <p className="text-sm text-gray-700 my-2">{review.content}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-start gap-2 mt-8 text-sm">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 border rounded bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>

        {/* Write a Review Section */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <input
            type="text"
            placeholder="Add a title"
            value={reviewForm.title}
            onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
          />
          <textarea
            placeholder="Details please! Your review helps other shoppers."
            value={reviewForm.content}
            onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
            rows={4}
          />
          <div className="mb-2">
            <label className="block text-sm mb-1">Select a rating (1-5)</label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
              className="w-full border p-2 rounded"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-gray-700">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
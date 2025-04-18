import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link
      to={`/product/${book.id}`}
      className="w-48 flex-shrink-0 cursor-pointer transition-transform hover:scale-105 group block"
    >
      <div className="relative">
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <img
            src={book.image || "/api/placeholder/200/280"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-semibold truncate group-hover:text-blue-600">{book.title}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>
        <div className="flex items-center mt-1">
          <span className="text-sm font-bold text-blue-600">${book.price}</span>
          {book.originalPrice > book.price && (
            <span className="text-xs line-through text-gray-400 ml-2">
              ${book.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                stroke={i < Math.floor(book.rating) ? "currentColor" : "currentColor"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">{book.rating} ({book.reviews})</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
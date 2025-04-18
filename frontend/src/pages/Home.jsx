import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "../components/BookCard";
import books from "../data/books"; // Mock data, replace with actual API call

const Home = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("recommended");
  const carouselRef = useRef(null);

  // Mock book data


  // Calculate absolute discount amount
  const getDiscount = (book) => book.originalPrice - book.price;

  // Get top 10 books with the most discount
  const onSaleBooks = [...books]
    .sort((a, b) => getDiscount(b) - getDiscount(a))
    .slice(0, 10);

  // Get top 8 books with most rating
  const recommendedBooks = [...books]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  // Get top 8 books with most reviews
  const popularBooks = [...books]
    .sort((a, b) => b.reviews - a.reviews || a.price - b.price)
    .slice(0, 8);

  // Carousel navigation functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      {/* On Sale Section - Carousel */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">On Sale</h2>
          <button
            onClick={() => navigate("/shop?sort=sale")}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View All
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {onSaleBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Featured Books */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Books</h2>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all ${tab === "recommended"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            onClick={() => setTab("recommended")}
          >
            Recommended
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium transition-all ${tab === "popular"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            onClick={() => setTab("popular")}
          >
            Popular
          </button>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {(tab === "recommended" ? recommendedBooks : popularBooks).map(
            (book) => (
              <BookCard key={book.id} book={book} />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
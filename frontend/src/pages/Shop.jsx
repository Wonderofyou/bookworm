import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import books from "../data/books"; // Assume we're using the same data file

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState("sale");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(20); // Default to 20 items per page
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    authors: [],
    ratings: []
  });

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = Math.min(startIndex + booksPerPage, totalBooks);
  const displayedBooks = filteredBooks.slice(startIndex, endIndex);

  // Define filter options
  const filterOptions = {
    categories: ["Category #1", "Category #2", "Fiction", "Non-Fiction", "Self-Help"],
    authors: ["author_name", "Author #1", "Author #2", "Delia Owens", "James Clear"],
    ratings: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"]
  };

  // Initialize sort option from URL params
  useEffect(() => {
    const sort = searchParams.get("sort");
    if (sort) setSortOption(sort);
  }, [searchParams]);

  // Apply sorting and filtering
  useEffect(() => {
    let result = [...books];

    // Apply category filters if any
    if (activeFilters.categories.length > 0) {
      result = result.filter(book =>
        activeFilters.categories.includes(book.category || "Uncategorized")
      );
    }

    // Apply author filters if any
    if (activeFilters.authors.length > 0) {
      result = result.filter(book =>
        activeFilters.authors.includes(book.author)
      );
    }

    // Apply rating filters if any
    if (activeFilters.ratings.length > 0) {
      result = result.filter(book => {
        const bookRating = Math.floor(book.rating);
        return activeFilters.ratings.some(rating => {
          const ratingValue = parseInt(rating.split(" ")[0]);
          return bookRating === ratingValue;
        });
      });
    }

    // Apply sorting
    if (sortOption === "onSale") {
      result.sort((a, b) => ((b.originalPrice - b.price) / b.originalPrice) - ((a.originalPrice - a.price) / a.originalPrice));
    } else if (sortOption === "popularity") {
      result.sort((a, b) => b.reviews - a.reviews);
    } else if (sortOption === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(result);
    setCurrentPage(1); // Reset to first page when filters/sort change
  }, [sortOption, activeFilters]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const updated = { ...prev };

      if (updated[filterType].includes(value)) {
        updated[filterType] = updated[filterType].filter(item => item !== value);
      } else {
        updated[filterType] = [...updated[filterType], value];
      }

      return updated;
    });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const FilterSection = ({ title, items, filterType }) => (
    <div className="mb-6">
      <h4 className="font-semibold mb-3 text-gray-800">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters[filterType].includes(item)}
                onChange={() => handleFilterChange(filterType, item)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold mr-2">Books</h2>
        <span className="text-sm text-gray-500">(Sorted by Category #1)</span>
      </div>

      {/* Filter + Sort + View */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Filter Section */}
        <aside className="md:w-1/4 mb-6 md:mb-0">
          <h3 className="font-bold mb-4 text-gray-800 border-b pb-2">Filter By</h3>
          <div className="space-y-5">
            <FilterSection
              title="Category"
              items={filterOptions.categories}
              filterType="categories"
            />
            <FilterSection
              title="Author"
              items={filterOptions.authors}
              filterType="authors"
            />
            <FilterSection
              title="Rating Review"
              items={filterOptions.ratings}
              filterType="ratings"
            />
          </div>
        </aside>

        {/* Main Books List */}
        <main className="md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="mb-3 sm:mb-0">
              <span className="text-sm text-gray-600">
                Showing {startIndex + 1}-{endIndex} of {totalBooks} books
              </span>
            </div>

            <div className="flex gap-4 items-center">
              {/* Sort Options */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    const newSortOption = e.target.value;
                    setSortOption(newSortOption);
                    // Cập nhật URL
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set("sort", newSortOption);
                    setSearchParams(newParams);
                  }}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="onSale">Sort by on sale</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="priceLow">Sort by price: low to high</option>
                  <option value="priceHigh">Sort by price: high to low</option>
                </select>
              </div>

              {/* Items Per Page */}
              <div className="relative">
                <select
                  value={booksPerPage}
                  onChange={(e) => {
                    setBooksPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing items per page
                  }}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value={5}>Show 5</option>
                  <option value={15}>Show 15</option>
                  <option value={20}>Show 20</option>
                  <option value={25}>Show 25</option>
                </select>
              </div>
            </div>
          </div>

          {/* Book Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedBooks.map((book) => (
              <div key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="mt-8 flex justify-center items-center">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded text-sm ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border text-sm ${currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded text-sm ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
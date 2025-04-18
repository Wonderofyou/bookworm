// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import NavItem from "./NavItem";
import SignInPopup from "./SignInPopup";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { totalItems } = useCart();

  // Kiểm tra xem người dùng đã xác thực khi tải trang
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Lỗi khi phân tích dữ liệu người dùng từ localStorage:", error);
    }
  }, []);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 m-4 bg-gray-100 shadow-md rounded-lg">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-bold text-lg">BOOKWORM</span>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/shop">Shop</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/cart">Cart ({totalItems})</NavItem>
        {!user ? (
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50"
            >
              <span className="mr-2">{`${user.first_name} ${user.last_name}`}</span>
              <svg
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {isPopupOpen && <SignInPopup setIsOpen={setIsPopupOpen} setUser={setUser} />}
    </nav>
  );
};

export default Navbar;
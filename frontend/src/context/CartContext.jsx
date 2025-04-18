// src/context/CartContext.js
import { createContext, useState, useContext, useEffect } from "react";

const initialCart = [
  {
    id: 1,
    title: "Book Title",
    author: "Author Name",
    image: "/api/placeholder/64/80",
    price: 29.99,
    originalPrice: 49.99,
    quantity: 2,
  },
  {
    id: 2,
    title: "Book Title 2",
    author: "Author Name 2",
    image: "/api/placeholder/64/80",
    price: 39.99,
    quantity: 1,
  },
];

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Tìm cách lấy giỏ hàng từ localStorage nếu có
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : initialCart;
  });

  // Lưu giỏ hàng vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            if (newQty > 8) return item;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 8) }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        updateQuantity,
        addToCart,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
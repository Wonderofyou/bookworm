// src/pages/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your cart: {totalItems} items</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/shop" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="divide-y border rounded">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4">
                  <Link
                    to={`/product/${item.id}`}
                    className="min-w-[64px] h-20 bg-gray-100 rounded overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-semibold hover:underline"
                    >
                      {item.title}
                    </Link>
                    <div className="text-sm text-gray-500">{item.author}</div>
                  </div>
                  <div className="text-right w-32">
                    <div className="font-semibold text-sm">${item.price.toFixed(2)}</div>
                    {item.originalPrice && (
                      <div className="text-xs line-through text-gray-400">
                        ${item.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 text-lg font-bold"
                      disabled={item.quantity >= 8}
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded p-4 h-fit">
            <h3 className="text-lg font-semibold mb-4 flex flex-col items-center text-center">Cart Totals</h3>
            <div className="text-2xl font-bold mb-6 flex flex-col items-center text-center">${totalPrice.toFixed(2)}</div>
            <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
              Place order
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
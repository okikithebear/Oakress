// src/Pages/Cart.jsx
import { useCart } from "../Context/CartContext";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, calculateTotal } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Navigate to checkout page with cart info
    navigate("/checkout", { state: { cart, total: calculateTotal() } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 md:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded"
                />

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-700 font-medium">
                    ₦{item.price.toLocaleString()}
                  </p>
                  {item.color && (
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  )}
                  {item.customColor && (
                    <p className="text-sm text-gray-500">
                      Custom Color: {item.customColor}
                    </p>
                  )}
                  {item.size && (
                    <p className="text-sm text-gray-500">
                      UK Size: {item.size}
                    </p>
                  )}
                  {item.height && (
                    <p className="text-sm text-gray-500">
                      Height: {item.height}
                    </p>
                  )}
                  {item.bustMeasurement && (
                    <p className="text-sm text-gray-500">
                      Bust Measurement: {item.bustMeasurement}
                    </p>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>

                {/* Item Total */}
                <div className="text-lg font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Order Notes + Summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Order special instructions
              </label>
              <textarea
                rows="4"
                className="w-full border rounded p-2 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Write any instructions here..."
              ></textarea>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Estimated Total</span>
                <span>₦{calculateTotal().toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500">
                Taxes, discounts, and shipping calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
              >
                Check Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, calculateTotal } = useCart();
  const navigate = useNavigate();

  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cart,
        total: calculateTotal(),
        deliveryLocation,
        orderNotes,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-16 text-center text-gray-900 tracking-tight">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-10">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 border border-gray-100 rounded-3xl shadow-xl bg-white"
                whileHover={{ y: -3, boxShadow: "0 15px 35px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Image */}
                <motion.img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-40 h-40 md:w-44 md:h-44 object-cover rounded-3xl flex-shrink-0 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  draggable={false}
                />

                {/* Details */}
                <div className="flex-1 space-y-3">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-gray-700 font-medium text-lg">
                    ₦{item.price.toLocaleString()}
                  </p>
                  <div className="text-sm text-gray-500 space-y-1">
                    {item.color && <p>Blouse Color: {item.color}</p>}
                    {item.customColor && <p>Skirt Color: {item.customColor}</p>}
                    {item.size && <p>UK Size: {item.size}</p>}
                    {item.height && <p>Height: {item.height}</p>}
                    {item.bustMeasurement && <p>Bust: {item.bustMeasurement}</p>}
                    {item.skirtLength && <p>Skirt Length: {item.skirtLength}</p>}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 shadow-sm transition text-gray-700"
                  >
                    -
                  </button>
                  <span className="px-4 text-lg font-medium text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-10 h-10 flex items-center justify-center border rounded-xl hover:bg-gray-100 shadow-sm transition text-gray-700"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 ml-0 md:ml-4 transition"
                  title="Remove Item"
                >
                  <Trash2 size={24} />
                </button>

                {/* Item Total */}
                <div className="text-lg md:text-xl font-semibold text-gray-900 ml-auto mt-4 md:mt-0">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Notes + Delivery + Payment Summary */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Delivery & Order Notes */}
            <div className="space-y-6">
              {/* Delivery Location */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Delivery Address
                </label>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="w-full border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-yellow-700 focus:outline-none shadow-sm"
                />
              </div>

              {/* Order Notes */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Order Notes</label>
                <textarea
                  rows="4"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl p-4 resize-none focus:ring-2 focus:ring-yellow-700 focus:outline-none shadow-sm"
                  placeholder="Any special instructions for your order?"
                ></textarea>
              </div>

              {/* Stripe Payment Methods */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">We accept:</p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    className="h-8"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="MasterCard"
                    className="h-8"
                  />
                </div>
              </div>
            </div>

            {/* Luxury Summary */}
            <motion.div
              className="space-y-6 p-8 rounded-3xl shadow-2xl sticky top-28 bg-gradient-to-br from-yellow-50 via-white to-yellow-50"
              whileHover={{ scale: 1.02, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between text-lg md:text-xl font-semibold text-gray-900">
                <span>Total</span>
                <span>₦{calculateTotal().toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-500">
                Taxes, discounts, and shipping calculated at checkout.
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-700 text-white py-3 rounded-2xl text-lg font-semibold hover:bg-yellow-800 shadow-md transition"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

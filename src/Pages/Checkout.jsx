// src/Pages/Checkout.jsx
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    specialInstructions: "",
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to checkout.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Details:", { form, cart, total: calculateTotal() });
    clearCart();
    navigate("/thank-you");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Billing / Shipping Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-6 bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            Billing Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              rows="3"
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none md:col-span-2"
            ></textarea>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <textarea
              name="specialInstructions"
              value={form.specialInstructions}
              onChange={handleChange}
              placeholder="Special Instructions (optional)"
              rows="2"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none md:col-span-2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-10">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            Order Summary
          </h2>
          <div className="divide-y divide-gray-200 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.size && `Size: ${item.size}, `}
                      {item.color && `Color: ${item.color}, `}
                      {item.height && `Height: ${item.height}, `}
                      {item.bustMeasurement && `Bust: ${item.bustMeasurement}`}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200 mt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₦{calculateTotal().toLocaleString()}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Taxes, shipping, and discounts calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

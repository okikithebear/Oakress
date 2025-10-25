// src/Pages/Checkout.jsx
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const passedState = location.state || {};
  const { deliveryLocation: passedDelivery, orderNotes: passedNotes } = passedState;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    specialInstructions: "",
    deliveryLocation: passedDelivery || "",
    orderNotes: passedNotes || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (passedDelivery) setForm(prev => ({ ...prev, deliveryLocation: passedDelivery }));
    if (passedNotes) setForm(prev => ({ ...prev, orderNotes: passedNotes }));
  }, [passedDelivery, passedNotes]);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to checkout.</p>
      </div>
    );
  }

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email address";
    if (!form.phone.match(/^\+?[0-9]{7,15}$/)) newErrors.phone = "Invalid phone number";
    if (!form.address.trim()) newErrors.address = "Shipping address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.deliveryLocation) newErrors.deliveryLocation = "Select a delivery region";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Order Details:", { form, cart, total: calculateTotal() });
      clearCart();
      navigate("/thank-you");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Billing / Shipping Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-6 bg-white p-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Billing & Delivery Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${errors.name && 'border-red-500'}`}
              />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </div>

            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${errors.email && 'border-red-500'}`}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>

            <div className="flex flex-col">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${errors.phone && 'border-red-500'}`}
              />
              {errors.phone && <span className="text-red-500 text-sm mt-1">{errors.phone}</span>}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${errors.city && 'border-red-500'}`}
              />
              {errors.city && <span className="text-red-500 text-sm mt-1">{errors.city}</span>}
            </div>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              rows="3"
              className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none resize-none md:col-span-2 ${errors.address && 'border-red-500'}`}
            ></textarea>
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}

            <div className="flex flex-col">
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${errors.country && 'border-red-500'}`}
              />
              {errors.country && <span className="text-red-500 text-sm mt-1">{errors.country}</span>}
            </div>

            <textarea
              name="specialInstructions"
              value={form.specialInstructions || form.orderNotes}
              onChange={handleChange}
              placeholder="Special Instructions / Order Notes"
              rows="2"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none resize-none md:col-span-2"
            ></textarea>

            {/* Delivery Location */}
            <div className="flex flex-col md:col-span-2">
              <select
                name="deliveryLocation"
                value={form.deliveryLocation}
                onChange={handleChange}
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none ${errors.deliveryLocation && 'border-red-500'}`}
              >
                <option value="">Select Delivery Region</option>
                <option value="international">Worldwide / International</option>
                <option value="africa">Africa</option>
                <option value="nigeria">Nigeria</option>
                <option value="other">Other</option>
              </select>
              {errors.deliveryLocation && <span className="text-red-500 text-sm mt-1">{errors.deliveryLocation}</span>}
            </div>

            {/* Stripe logos */}
            <div className="flex items-center gap-4 md:col-span-2 mt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-8"/>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="MasterCard" className="h-8"/>
            
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-3 rounded-2xl font-semibold hover:bg-yellow-800 shadow-md transition"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl h-fit sticky top-10">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Order Summary</h2>
          <div className="divide-y divide-gray-200 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <img src={item.image || "/placeholder.png"} alt={item.name} className="w-20 h-20 object-cover rounded-lg"/>
                  <div className="space-y-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.size && `Size: ${item.size}, `}
                      {item.color && `Color: ${item.color}, `}
                      {item.height && `Height: ${item.height}, `}
                      {item.bustMeasurement && `Bust: ${item.bustMeasurement}`}
                    </p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200 mt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₦{calculateTotal().toLocaleString()}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">Taxes, shipping, and discounts calculated at checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout
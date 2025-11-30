// src/Pages/Checkout.jsx
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getNames } from "country-list";

const Checkout = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const countryNames = getNames();

  const passedState = location.state || {};
  const {
    deliveryLocation: passedDelivery,
    orderNotes: passedNotes,
    deliveryFee: passedDeliveryFee = 0,
    totalWithDelivery: passedGrandTotal = calculateTotal(),
  } = passedState;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "", // kept unchanged — even if unused
    specialInstructions: "",
    deliveryLocation: passedDelivery || "",
    orderNotes: passedNotes || "",
    deliveryMethod: "",
  });

  const [checkoutTotals, setCheckoutTotals] = useState({
    deliveryFee: passedDeliveryFee,
    grandTotal: passedGrandTotal,
  });

  const [errors, setErrors] = useState({});

  // Update form with passed state
  useEffect(() => {
    if (passedDelivery) {
      setForm((prev) => ({ ...prev, deliveryLocation: passedDelivery }));
    }
    if (passedNotes) {
      setForm((prev) => ({ ...prev, orderNotes: passedNotes }));
    }
  }, [passedDelivery, passedNotes]);

  // Recalculate total when cart changes
  useEffect(() => {
    const subtotal = calculateTotal();
    setCheckoutTotals((prev) => ({
      ...prev,
      grandTotal: subtotal + prev.deliveryFee,
    }));
  }, [cart]);

  // VALIDATION FIX — only change made
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email address";
    if (!form.phone.match(/^\+?[0-9]{7,15}$/))
      newErrors.phone = "Invalid phone number";
    if (!form.address.trim()) newErrors.address = "Shipping address is required";
    if (!form.city.trim()) newErrors.city = "City is required";

    // ❗ FIX: use deliveryLocation instead of country (your UI uses deliveryLocation)
    if (!form.deliveryLocation.trim())
      newErrors.deliveryLocation = "Select a delivery region";

    if (!form.deliveryMethod)
      newErrors.deliveryMethod = "Select a delivery method";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Update delivery fee dynamically
    if (name === "deliveryMethod") {
      let fee = 0;
      if (value === "express") fee = 5;
      else if (value === "standard") fee = 3;
      else if (value === "pickup") fee = 0;

      const subtotal = calculateTotal();
      setCheckoutTotals({
        deliveryFee: fee,
        grandTotal: subtotal + fee,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

   if (Object.keys(validationErrors).length === 0) {
      // Build orderDetails object to pass to Thank You page
      const orderDetails = {
        customer: form,
        cart: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null,
          color: item.color || null,
          height: item.height || null,
          bustMeasurement: item.bustMeasurement || null,
        })),
        deliveryFee: checkoutTotals.deliveryFee,
        total: checkoutTotals.grandTotal,
      };

      clearCart();
      navigate("/thank-you", { state: orderDetails }); // ✅ pass order info
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-6 bg-white p-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            Billing & Delivery Details
          </h2>

          {/* FORM FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 ${
                  errors.name && "border-red-500"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 ${
                  errors.email && "border-red-500"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 ${
                  errors.phone && "border-red-500"
                }`}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-yellow-500 ${
                  errors.city && "border-red-500"
                }`}
              />
              {errors.city && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.city}
                </span>
              )}
            </div>

            {/* Address */}
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              rows="3"
              className={`w-full border rounded-xl p-3 md:col-span-2 focus:ring-2 focus:ring-yellow-500 ${
                errors.address && "border-red-500"
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}

            {/* Special Instructions */}
            <textarea
              name="specialInstructions"
              value={form.specialInstructions}
              onChange={handleChange}
              placeholder="Special Instructions / Order Notes"
              rows="2"
              className="w-full border rounded-xl p-3 md:col-span-2"
            />
          </div>

          {/* Delivery Country */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="deliveryLocation"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Delivery Country
            </label>
            <select
              id="deliveryLocation"
              name="deliveryLocation"
              value={form.deliveryLocation}
              onChange={handleChange}
              className={`appearance-none w-full border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 ${
                errors.deliveryLocation && "border-red-500"
              }`}
            >
              <option value="">Select Country</option>
              {countryNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.deliveryLocation && (
              <span className="text-red-500 text-sm mt-1">
                {errors.deliveryLocation}
              </span>
            )}
          </div>

          {/* Delivery Method */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="deliveryMethod"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Delivery Method
            </label>
            <select
              id="deliveryMethod"
              name="deliveryMethod"
              value={form.deliveryMethod}
              onChange={handleChange}
              className={`appearance-none w-full border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 ${
                errors.deliveryMethod && "border-red-500"
              }`}
            >
              <option value="">Select Delivery Method</option>
              <option value="standard">Standard Delivery — £3</option>
              <option value="express">Express Delivery — £5</option>
              <option value="pickup">Store Pickup — FREE</option>
            </select>
            {errors.deliveryMethod && (
              <span className="text-red-500 text-sm mt-1">
                {errors.deliveryMethod}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-700 text-white py-3 rounded-2xl font-semibold hover:bg-yellow-800 shadow-md transition"
          >
            Place Order
          </button>
        </form>

        {/* RIGHT — Order Summary */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl h-fit sticky top-10">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            Order Summary
          </h2>

          <div className="divide-y divide-gray-200 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4">
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
                  £{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t space-y-2">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>£{calculateTotal().toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span>Delivery</span>
              <span>£{checkoutTotals.deliveryFee.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>£{checkoutTotals.grandTotal.toLocaleString()}</span>
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

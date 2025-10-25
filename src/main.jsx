// src/main.jsx
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { CurrencyProvider } from "./Context/CurrencyContext.jsx"; // ✅ Add this

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

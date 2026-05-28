import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { AuthProvider } from "./Context/AuthContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { CurrencyProvider } from "./Context/CurrencyContext.jsx";

import AnalyticsTracker from "./Components/AnalyticsTracker.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnalyticsTracker />

    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
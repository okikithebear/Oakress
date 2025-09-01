import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./Context/ShopContext.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx"; // ✅ Import AuthProvider

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      {" "}
      {/* ✅ Wrap inside AuthProvider */}
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </AuthProvider>
  </BrowserRouter>
);

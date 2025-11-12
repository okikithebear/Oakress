// src/Context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import PropTypes from "prop-types"; // ✅ Add this import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error(error); // ✅ Use the error to silence ESLint warning
      toast.error("Error signing out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add PropTypes validation to remove the "children missing" warning
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Stable custom hook
export const useAuth = () => useContext(AuthContext);

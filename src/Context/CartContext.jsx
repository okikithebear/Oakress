// src/Context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { products as productAssets } from "../assets/assets";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [currency] = useState("₦");
  const [user, setUser] = useState(null);
  const [guestId, setGuestId] = useState(
    localStorage.getItem("guestId") || null
  );

  // ✅ Ensure user/guest ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser && !guestId) {
        const newGuestId = uuidv4();
        setGuestId(newGuestId);
        localStorage.setItem("guestId", newGuestId);
      }
    });
    return () => unsubscribe();
  }, [guestId]);

  // ✅ Realtime Firestore cart sync
  useEffect(() => {
    if (!user && !guestId) return;

    const currentUserId = user ? user.uid : guestId;
    const cartRef = collection(db, "carts", currentUserId, "items");

    const unsubscribeCart = onSnapshot(cartRef, (snapshot) => {
      const cartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCart(cartItems);
      const count = cartItems.reduce(
        (acc, item) => acc + (item.quantity || 1),
        0
      );
      setCartCount(count);
    });

    return () => unsubscribeCart();
  }, [user, guestId]);

  // ✅ Load products
  useEffect(() => {
    setProducts(productAssets);
  }, []);

  // ✅ Add to cart
  const addToCart = async (product) => {
    const currentUserId = user ? user.uid : guestId;
    const { id, size, height, busty, quantity, price } = product;

    const variationKey = `${id}_${size || "default"}_${height || "default"}_${
      busty ? "busty" : "normal"
    }`;
    const itemRef = doc(db, "carts", currentUserId, "items", variationKey);

    const existingItem = cart.find((item) => item.id === variationKey);

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + (quantity || 1);
      await setDoc(
        itemRef,
        {
          quantity: updatedQuantity,
          totalCost: price * updatedQuantity,
        },
        { merge: true }
      );
    } else {
      await setDoc(
        itemRef,
        {
          ...product,
          id: variationKey,
          quantity: quantity || 1,
          totalCost: price * (quantity || 1),
        },
        { merge: true }
      );
    }

    toast.success("Item added to cart!");
  };

  // ✅ Remove product
  const removeFromCart = async (id) => {
    const currentUserId = user ? user.uid : guestId;
    const itemRef = doc(db, "carts", currentUserId, "items", id);
    try {
      await deleteDoc(itemRef);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    const currentUserId = user ? user.uid : guestId;
    const cartRef = collection(db, "carts", currentUserId, "items");
    const cartItems = await getDocs(cartRef);
    cartItems.forEach((doc) => deleteDoc(doc.ref));
  };

  // ✅ Increase quantity
  const increaseQty = async (id) => {
    const currentUserId = user ? user.uid : guestId;
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const itemRef = doc(db, "carts", currentUserId, "items", id);
    await setDoc(
      itemRef,
      {
        quantity: item.quantity + 1,
        totalCost: (item.quantity + 1) * item.price,
      },
      { merge: true }
    );
  };

  // ✅ Decrease quantity (min 1)
  const decreaseQty = async (id) => {
    const currentUserId = user ? user.uid : guestId;
    const item = cart.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;

    const itemRef = doc(db, "carts", currentUserId, "items", id);
    await setDoc(
      itemRef,
      {
        quantity: item.quantity - 1,
        totalCost: (item.quantity - 1) * item.price,
      },
      { merge: true }
    );
  };

  // ✅ Calculate total cost
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        calculateTotal,
        currency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

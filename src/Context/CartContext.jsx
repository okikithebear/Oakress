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
  const [currency] = useState("£");
  const [user, setUser] = useState(null);
  const [guestId, setGuestId] = useState(
    localStorage.getItem("guestId") || null
  );

  // ⭐ Delivery States
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState("");

  // Normalize ID
  const normalizeId = (id) => (typeof id === "string" ? id : String(id));

  // Auth / guest handling
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

  // Realtime Firestore sync
  useEffect(() => {
    if (!user && !guestId) return;

    const currentUserId = user ? user.uid : guestId;
    const cartRef = collection(db, "carts", currentUserId, "items");

    const unsubscribeCart = onSnapshot(
      cartRef,
      (snapshot) => {
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
      },
      (error) => {
        console.error("Error fetching cart:", error);
        toast.error("Error loading cart. Check your network.");
      }
    );

    return () => unsubscribeCart();
  }, [user, guestId]);

  // Load local product assets
  useEffect(() => {
    setProducts(productAssets);
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    const currentUserId = user ? user.uid : guestId;
    const { id, size, height, busty, quantity, price } = product;

    const variationKey = `${normalizeId(id)}_${size || "default"}_${
      height || "default"
    }_${busty ? "busty" : "normal"}`;

    const itemRef = doc(db, "carts", currentUserId, "items", variationKey);
    const existingItem = cart.find((item) => item.id === variationKey);

    try {
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
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  // Remove item
  const removeFromCart = async (id) => {
    const currentUserId = user ? user.uid : guestId;
    const itemRef = doc(db, "carts", currentUserId, "items", normalizeId(id));

    try {
      await deleteDoc(itemRef);
      toast.info("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Unable to remove item.");
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    const currentUserId = user ? user.uid : guestId;
    const cartRef = collection(db, "carts", currentUserId, "items");
    const cartItems = await getDocs(cartRef);

    const deletions = cartItems.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletions);

    toast.info("Cart cleared.");
  };

  // Increase quantity
  const increaseQty = async (id) => {
    const currentUserId = user ? user.uid : guestId;
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const updatedQty = item.quantity + 1;
    const itemRef = doc(db, "carts", currentUserId, "items", id);

    await setDoc(
      itemRef,
      {
        quantity: updatedQty,
        totalCost: updatedQty * item.price,
      },
      { merge: true }
    );
  };

  // Decrease quantity
  const decreaseQty = async (id) => {
    const currentUserId = user ? user.uid : guestId;
    const item = cart.find((i) => i.id === id);
    if (!item || item.quantity <= 1) return;

    const updatedQty = item.quantity - 1;
    const itemRef = doc(db, "carts", currentUserId, "items", id);

    await setDoc(
      itemRef,
      {
        quantity: updatedQty,
        totalCost: updatedQty * item.price,
      },
      { merge: true }
    );
  };

  // Calculate total items cost
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);
  };

  // ⭐ Delivery method handler
const setDeliveryMethodAndFee = (method) => {
  setDeliveryMethod(method);

  if (method === "express") setDeliveryFee(5);     // £5
  else if (method === "standard") setDeliveryFee(3); // £3
  else if (method === "pickup") setDeliveryFee(0);   // FREE
  else setDeliveryFee(0);
};


  // ⭐ Grand total = cart total + delivery
  const calculateTotalWithDelivery = () => {
    return calculateTotal() + deliveryFee;
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
        calculateTotalWithDelivery,

        // Delivery exports
        deliveryFee,
        deliveryMethod,
        setDeliveryMethod: setDeliveryMethodAndFee,

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

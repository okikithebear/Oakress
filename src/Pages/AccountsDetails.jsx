import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

// Import icons from react-icons
import { 
  FaUser, 
  FaEnvelope,  
  FaHistory, 
  FaCalendarAlt, 
  FaInfoCircle, 
  FaBoxOpen, 
  FaRegIdBadge, 
  FaShoppingCart 
} from 'react-icons/fa';

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // A constant avatar image for all users
  const avatarUrl = "https://i.pravatar.cc/150?img=3";

  // Animations for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setError("User not logged in.");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch user profile details
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          throw new Error("User data not found in Firestore.");
        }

        // Fetch purchase history (orders must include a userId field)
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid), orderBy("timestamp", "desc"));
        const orderSnap = await getDocs(q);
        const orders = orderSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPurchaseHistory(orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-50 to-white">
        <motion.div 
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10">
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          MY ACCOUNT
        </h2>
        {error && (
          <p className="text-center text-red-500 mb-4">{error}</p>
        )}
        {!error && (
          <>
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow-md mb-10">
              <img 
                src={avatarUrl} 
                alt="User Avatar" 
                className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
              />
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <FaUser className="text-purple-600 mr-2" />
                  <p className="text-xl font-semibold text-gray-700">
                    {userData?.name || "N/A"}
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-start mb-2">
                  <FaEnvelope className="text-purple-600 mr-2" />
                  <p className="text-lg text-gray-600">{userData?.email || "N/A"}</p>
                </div>
                
              </div>
            </div>

            {/* Purchase History */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
              <FaHistory className="mr-2 text-purple-600" />
              Purchase History
            </h3>
            {purchaseHistory.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {purchaseHistory.map(order => (
                    <motion.div
                      key={order.id}
                      className="p-6 border rounded-lg shadow-md bg-gray-50"
                      variants={cardVariants}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="flex items-center mb-2">
                        <FaRegIdBadge className="text-purple-600 mr-2" />
                        <p className="text-lg font-medium text-gray-800">
                          <strong>Order ID:</strong> {order.id}
                        </p>
                      </div>
                      <div className="flex items-center mb-1">
                        <FaCalendarAlt className="text-purple-600 mr-2" />
                        <p className="text-gray-700">
                          <strong>Date Bought:</strong>{" "}
                          {order.timestamp 
                            ? new Date(order.timestamp.seconds * 1000).toLocaleDateString() 
                            : "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center mb-1">
                        <FaInfoCircle className="text-purple-600 mr-2" />
                        <p className="text-gray-700">
                          <strong>Status:</strong> {order.status || "Completed"}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <FaBoxOpen className="text-purple-600 mr-2 mt-1" />
                        <p className="text-gray-700">
                          <strong>Products:</strong>{" "}
                          {order.cart ? order.cart.map(item => item.name).join(", ") : "N/A"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg shadow-inner">
                <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl">No purchase history found.</p>
                <p className="mt-4 text-purple-600 font-semibold">
                  Start shopping to see your order history here!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ProfileUser = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setProfile(userSnap.data());
          } else {
            // Create new profile if not exists
            await setDoc(userRef, {
              name: user.displayName || "",
              email: user.email,
              phone: "",
              address: "",
              createdAt: new Date(),
            });
            setProfile({
              name: user.displayName || "",
              email: user.email,
              phone: "",
              address: "",
            });
          }

          // Fetch user orders
          const ordersRef = collection(db, "users", user.uid, "orders");
          const ordersSnap = await getDocs(ordersRef);
          const userOrders = [];
          ordersSnap.forEach((doc) =>
            userOrders.push({ id: doc.id, ...doc.data() })
          );
          setOrders(userOrders);
        } catch (error) {
          console.error("Error loading profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profile) {
    return <p>No profile data found.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Profile</h1>
      <div className="mb-6">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone || "Not set"}
        </p>
        <p>
          <strong>Address:</strong> {profile.address || "Not set"}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-2">My Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border-b py-2">
              Order ID: {order.id} | Total: {order.total || 0}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default ProfileUser;

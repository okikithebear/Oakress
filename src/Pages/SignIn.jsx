import { useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../firebase"; // ✅ Firebase instance
import { assets } from "../assets/assets";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const actionCodeSettings = {
        url: "http://localhost:5173/verify", // For Vite dev server
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("Check your email for the sign-in link.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send sign-in link. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcf8]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-6">
          <img src={assets.logo} alt="Logo" className="mx-auto w-32" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-gray-600 mb-6">
          Enter your email and we will send you a verification link.
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brown-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4b2e17] text-white py-3 rounded-lg font-medium hover:bg-[#3c2512] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>

        {/* Message */}
        {message && <p className="text-sm text-gray-600 mt-4">{message}</p>}

        {/* Footer Links */}
        <div className="flex justify-center gap-4 text-sm text-gray-500 mt-6">
          <a href="/privacy" className="hover:underline">
            Privacy policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of service
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

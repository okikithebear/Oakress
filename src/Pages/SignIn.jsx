import { useState, useEffect } from "react";
import { sendSignInLinkToEmail, GoogleAuthProvider, signInWithPopup, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase";
import { assets } from "../assets/assets";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

// ✅ Auth Layout
const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4">
    <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 text-center transform transition-all duration-300 hover:scale-[1.02]">
      <img src={assets.logo} alt="Logo" className="mx-auto w-32 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">{subtitle}</p>
      {children}
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

// ✅ Spinner
const Spinner = ({ color = "border-white", size = "w-5 h-5" }) => (
  <div className={`animate-spin rounded-full border-2 ${color} border-t-transparent ${size}`}></div>
);

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // ✅ Automatically sign in if email link detected
  useEffect(() => {
    const handleEmailLinkSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let storedEmail = window.localStorage.getItem("emailForSignIn");
        if (!storedEmail) {
          storedEmail = window.prompt("Please enter your email to complete sign-in:");
        }
        try {
          await signInWithEmailLink(auth, storedEmail, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          toast.success("✅ Email verified! You are now signed in.");
        } catch (error) {
          console.error(error);
          toast.error("❌ Verification failed. Try sending a new link.");
        }
      }
    };
    handleEmailLinkSignIn();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  // ✅ Email link sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return toast.error("Enter a valid email address");

    setLoadingEmail(true);
    try {
      const actionCodeSettings = {
        url: window.location.href, // Keep user on same page
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);

      toast.success("✅ Verification link sent! Check your email to complete sign-in.");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send link. Try again.");
    }
    setLoadingEmail(false);
  };

  // ✅ Google sign-in
  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("✅ Signed in successfully with Google");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed");
    }
    setLoadingGoogle(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <AuthLayout title="Sign In" subtitle="Access your account securely.">
        {/* Email Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 shadow-inner transition-all duration-300 hover:shadow-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={loadingEmail}
            className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-xl font-semibold hover:from-yellow-700 hover:to-yellow-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loadingEmail && <Spinner />}
            {loadingEmail ? "Sending link..." : "Send Sign-In Link"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loadingGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50"
        >
          {loadingGoogle && <Spinner color="border-black" />}
          <img src={assets.googleIcon} alt="Google" className="w-5" />
          {loadingGoogle ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <a href="/terms-of-service" className="underline hover:text-gray-600 transition">Terms</a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline hover:text-gray-600 transition">Privacy Policy</a>.
        </p>
      </AuthLayout>
    </>
  );
};

export default SignIn;

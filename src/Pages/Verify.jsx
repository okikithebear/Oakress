import { useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../Firebase";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyEmailLink = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const verifySignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt(
            "Please enter your email to complete verification:"
          );
        }
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          setStatus("success");
          setMessage("✅ Your email has been verified! Redirecting...");
          setTimeout(() => navigate("/profile"), 3000);
        } catch (error) {
          console.error(error);
          setStatus("error");
          setMessage(
            "❌ Verification failed. Please try again or request a new link."
          );
        }
      } else if (user) {
        navigate("/profile");
      } else {
        setStatus("error");
        setMessage("Invalid or expired verification link.");
      }
    };
    verifySignIn();
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        {/* Brand Logo */}
        <h1 className="text-2xl font-bold text-[#6f55f2] mb-4">
          Verify Your Email
        </h1>

        {/* Status Indicator */}
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-8 w-8 text-[#6f55f2] mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <p className="text-gray-600">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <p className="text-green-600 font-medium">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <p className="text-red-600 font-medium mb-4">{message}</p>
            <a
              href="/resend-link"
              className="inline-block px-4 py-2 bg-[#6f55f2] text-white rounded-lg hover:bg-[#5a3ef0] transition"
            >
              Resend Verification Email
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailLink;

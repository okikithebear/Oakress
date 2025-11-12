import { useState } from 'react';
import { Link } from 'react-router-dom';  // <-- Add this line

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Logic for password reset
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-indigo-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password</h2>
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required 
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-300">
            Send Reset Link
          </button>
        </form>
        <p className="text-center text-gray-600">
          Remembered your password?{' '}
          <Link to="/login" className="text-teal-600 hover:underline">Login here</Link>  {/* Correct Link usage */}
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
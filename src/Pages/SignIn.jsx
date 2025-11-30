import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../firebase';
import { doc, setDoc} from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [formMode, setFormMode] = useState('login'); // 'login', 'signup', 'forgotPassword'
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validationSchemas = {
    login: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    signup: Yup.object({
      name: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    forgotPassword: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const toggleMode = (mode) => {
    setFormMode(mode);
    setError('');
    setSuccessMessage('');
  };

  // LOGIN
  const handleLogin = async (values) => {
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Store UID in localStorage so account page can fetch Firestore data
      localStorage.setItem('uid', user.uid);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/account-details'), 1000);
    } catch (err) {
      setError(err.message || 'Invalid login details!');
      toast.error(err.message || 'Invalid login details!');
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async (values) => {
    setLoading(true);
    setError('');
    const { name, email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to Firestore
      await setDoc(doc(db, 'users', user.uid), { uid: user.uid, name, email, createdAt: new Date() });

      // Store UID in localStorage for account page
      localStorage.setItem('uid', user.uid);

      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/account-details'), 1000);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please login instead.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD RESET
  const handlePasswordReset = async (values) => {
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, values.email);
      setSuccessMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={formMode}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl md:text-4xl font-bold mb-8 text-gray-800">
                {formMode === 'login'
                  ? 'Welcome back to Oakress'
                  : formMode === 'signup'
                  ? 'Create your Oakress account'
                  : 'Reset your Oakress password'}
              </h1>

              {error && <div className="text-red-500 mb-4">{error}</div>}
              {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

              <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={validationSchemas[formMode]}
                onSubmit={(values) => {
                  formMode === 'login'
                    ? handleLogin(values)
                    : formMode === 'signup'
                    ? handleSignup(values)
                    : handlePasswordReset(values);
                }}
              >
                {() => (
                  <Form className="space-y-4">
                    {formMode === 'signup' && (
                      <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                        <User className="text-gray-500 mr-3" size={20} />
                        <Field
                          name="name"
                          type="text"
                          placeholder="Full Name"
                          className="bg-transparent outline-none flex-1 text-gray-800"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    )}

                    <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                      <Mail className="text-gray-500 mr-3" size={20} />
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="bg-transparent outline-none flex-1 text-gray-800"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    {(formMode === 'login' || formMode === 'signup') && (
                      <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                        <Lock className="text-gray-500 mr-3" size={20} />
                        <Field
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className="bg-transparent outline-none flex-1 text-gray-800"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-3">
                          {showPassword ? <EyeOff className="text-gray-500" size={20} /> : <Eye className="text-gray-500" size={20} />}
                        </button>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="text-white px-6 py-3 rounded-lg w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                    >
                      {loading ? 'Loading...' : formMode === 'login' ? 'Sign In' : formMode === 'signup' ? 'Sign Up' : 'Reset Password'}
                      <ArrowRight className="ml-2" size={20} />
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Toggle Links */}
              {formMode === 'login' && (
                <div className="flex justify-between mt-4">
                  <button onClick={() => toggleMode('forgotPassword')} className="text-purple-600">
                    Forgot Password?
                  </button>
                  <button onClick={() => toggleMode('signup')} className="text-purple-600">
                    Create an Account
                  </button>
                </div>
              )}
              {formMode === 'signup' && (
                <div className="flex justify-center mt-4">
                  <button onClick={() => toggleMode('login')} className="text-purple-600">
                    Already have an account? Login
                  </button>
                </div>
              )}
              {formMode === 'forgotPassword' && (
                <div className="flex justify-center mt-4">
                  <button onClick={() => toggleMode('login')} className="text-purple-600">
                    Back to Login
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Background Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-purple-600">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {formMode === 'login'
              ? 'New to Oakress?'
              : formMode === 'signup'
              ? 'Already have an account?'
              : 'Remembered your password?'}
          </h2>
          <p className="text-gray-200 mb-8">
            {formMode === 'login'
              ? 'Sign up and discover a great collection of Artistic designs!'
              : 'Sign in to access your Oakress account and continue your journey!'}
          </p>
          <button
            className="bg-white px-6 py-3 rounded-lg text-purple-600 font-medium hover:bg-gray-100 transition-colors duration-200"
            onClick={() => toggleMode(formMode === 'login' ? 'signup' : 'login')}
          >
            {formMode === 'login' ? 'Create an Account' : 'Sign In'}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default SignIn;

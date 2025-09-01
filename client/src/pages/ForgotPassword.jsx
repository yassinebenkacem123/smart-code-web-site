import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope, FaUser, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('etudiant');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('/api/auth/forgot-password', { email, role });
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEmailSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Une erreur est survenue', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-3xl shadow-2xl shadow-sky-900/30 border border-sky-500/30 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-sky-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPaperPlane className="text-sky-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Email Sent!</h2>
            <p className="text-sky-300 mt-4">
              We've sent password reset instructions to your email address.
              Please check your inbox and follow the link to reset your password.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col gap-4">
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 text-sky-400 hover:text-sky-300"
            >
              <FaArrowLeft /> Back to Login
            </Link>
            
            <p className="text-gray-500 text-center text-sm mt-6">
              Didn't receive the email? Check your spam folder or 
              <button 
                onClick={() => setEmailSent(false)}
                className="text-sky-400 hover:text-sky-300 ml-1"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-3xl shadow-2xl shadow-sky-900/30 border border-sky-500/30">
          <div className="text-center ">
            <div className="bg-sky-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPaperPlane className="text-sky-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sky-300">Email</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-sky-500" />
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sky-300">Role</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-sky-500" />
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none"
                  required
                >
                  <option value="etudiant">Étudiant</option>
                  <option value="enseignant">Enseignant</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r cursor-pointer from-sky-500 to-blue-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" /> Send Reset Link
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sky-300">
              Remember your password? {' '}
              <Link 
                to="/login" 
                className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
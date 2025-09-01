import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const role = params.get('role');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post('/api/auth/reset-password', {
        token,
        role,
        nouveau_mdp: password
      });
      
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      setIsSuccess(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred', {
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-3xl shadow-2xl shadow-sky-900/30 border border-sky-500/30 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-sky-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Password Reset!</h2>
            <p className="text-sky-300 mt-4">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
          </div>
          
          <div className="mt-8 flex flex-col gap-4">
            <Link 
              to="/login" 
              className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
          >
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-3xl shadow-2xl shadow-sky-900/30 border border-sky-500/30">
          <div className="text-center mb-8">
            <div className="bg-sky-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-sky-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sky-300">New Password</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-sky-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <FaEyeSlash className="text-sky-500" /> : 
                    <FaEye className="text-sky-500" />
                  }
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sky-300">Confirm Password</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-sky-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 
                    <FaEyeSlash className="text-sky-500" /> : 
                    <FaEye className="text-sky-500" />
                  }
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r cursor-pointer from-sky-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
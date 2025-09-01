import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    role: 'etudiant'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const {login} = useAuthStore();
  const navigate = useNavigate();
  // handle Submit function:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        const response = await axios.post('/api/auth/login', formData);
        const data = await response.data;

        if (data.success) {
            const decodedToken = jwtDecode(data.token);
            const role = decodedToken.role;

            login({
                token: data.token,
                role: role,
                user: data
            });
            
            toast.success('Connexion réussie', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
            
            navigate(`/${role}-dashboard`,{replace:true});
        } else {
            toast.error(data.message || 'Une erreur est survenue', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || 'Une erreur est survenue', {
            position: "top-right",
            autoClose: 1500,
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
  return (
    <div className="min-h-screen flex items-center justify-center bg p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 to-sky-600/45 rounded-3xl transform rotate-6"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-sky-500/30 rounded-3xl  shadow-2xl shadow-sky-900/30 overflow-hidden">
              <img 
                src={`../../src/assets/${formData.role}.png`} 
                alt={formData.role} 
                className="w-full h-auto object-contain transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8 rounded-3xl shadow-2xl shadow-sky-900/30 border border-sky-500/30 w-full max-w-md"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-sky-300 mt-2">Sign in to your account</p>
            </div>
            <div className="">
              <label className="block mb-2 text-sky-300">Email</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-sky-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block mb-2 text-sky-300">Password</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-sky-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="mot_de_passe"
                  className="w-full pl-10 pr-10 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={formData.mot_de_passe}
                  onChange={handleChange}
                  placeholder="••••••••"
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

            <div className="mb-3">
              <label className="block mb-2 text-sky-300">Role</label>
              <div className="relative">
                <div className="absolute z-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-sky-500" />
                </div>
                <select
                  name="role"
                  className="w-full pl-10 pr-4 py-3 bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 appearance-none"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option  className='bg-gray-800'  value="etudiant">Étudiant</option>
                  <option className='bg-gray-800' value="enseignant">Enseignant</option>
                  <option className='bg-gray-800' value="admin">Admin</option>
                </select>
              </div>
            </div>
            
            <div className='flex justify-between items-center mb-6'>
              <Link 
                to="/forgot-password" 
                className="text-sky-400 underline hover:text-sky-300 text-sm transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Connexion"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
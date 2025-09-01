import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0B0F19] border-t border-sky-300/40 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-sky-400/10 blur-3xl z-0"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-sky-500/10 blur-3xl z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Developer Image */}
          <div className="flex flex-col items-center md:col-span-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full blur-lg opacity-70 group-hover:opacity-90 transition-all duration-500 animate-pulse"></div>
              <div className="relative z-10 w-40 h-40 rounded-full border-4 border-sky-500/30 shadow-xl overflow-hidden">
                <img 
                  src="../../src/assets/footer-picture.png" 
                  alt="Developer" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
            </div>
          </div>
          
          {/* Logo Section */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="mb-6 border-b border-sky-400/40 pb-4 w-full">
              <div className="flex justify-center md:justify-start">
                <Logo />
              </div>
            </div>
            <p className="text-gray-400 text-center md:text-left mb-6">
              Transforming ideas into innovative digital solutions through cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-sky-900/50 p-3 rounded-full hover:bg-sky-700 transition-all duration-300 group"
                >
                  <Icon className="text-sky-300 group-hover:text-white text-lg transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start md:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-sky-300 border-b border-sky-400/30 pb-2 w-full text-center md:text-left">Quick Links</h3>
            <ul className="space-y-3 w-full">
              {[
                { name: "Accueil", path: "/" },
                { name: "A propos", path: "/about" },
              ].map((link, index) => (
                <li key={index} className="flex justify-center md:justify-start">
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-sky-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 group-hover:animate-pulse"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 w-full">
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-sky-500 to-sky-400 px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center group"
              >
                <span>Sign In</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-6 text-sky-300 border-b border-sky-400/30 pb-2 w-full text-center md:text-left">Contact</h3>
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-center md:justify-start text-gray-300 hover:text-sky-300 transition-colors">
                <FaEnvelope className="text-sky-400 mr-3" />
                <a href="mailto:contact@smartcode.com">contact@smartcode.com</a>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-300 hover:text-sky-300 transition-colors">
                <FaPhone className="text-sky-400 mr-3" />
                <a href="tel:+212610833077">+212 610 83 30 77</a>
              </div>
            </div>
            
            <div className="mt-10 w-full">
              <h3 className="text-lg font-semibold mb-4 text-gray-300 text-center md:text-left">Location</h3>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-sky-900">
                <p className="text-center md:text-left">Fes, Morocco</p>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-6 text-sky-300 border-b border-sky-400/30 pb-2 w-full text-center md:text-left">Secure Payment</h3>
              <div className="flex justify-center md:justify-start space-x-3">
                {['Visa', 'Mastercard', 'PayPal'].map((method, index) => (
                  <div key={index} className="bg-gray-800/50 border border-sky-900 rounded-lg px-3 py-2 text-sm">
                    {method}
                  </div>
                ))}
              </div>
            
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-sky-900 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © 2025 SmartCode. All rights reserved. Created by Yassine Ben Kacem
          </p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
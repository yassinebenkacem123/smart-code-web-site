import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
const CallToAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-8 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-sky-400/10 animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-12 h-12 rounded-full bg-sky-300/10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-sky-400/20 animate-pulse"></div>
      
      <div className="max-w-7xl w-full relative z-10">
        <div className={`flex flex-col lg:flex-row items-center lg:items-start py-10 gap-8 lg:gap-12 transition-all duration-1000 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Image Grid */}
          <div className="w-full lg:w-[55%] h-1/2">
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Left large image */}
              <div className="row-span-2 relative group overflow-hidden rounded-2xl lg:rounded-[80px] transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-2xl lg:rounded-[80px]"></div>
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="../../src/assets/learn1.png"
                  alt="Learn 1"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white">
                  <h3 className="font-chela-one  text-xl">Apprendre</h3>
                </div>
              </div>

              {/* Top right image */}
              <div className="relative group overflow-hidden rounded-t-2xl lg:rounded-tr-[80px] transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-t-2xl lg:rounded-tr-[80px]"></div>
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="../../src/assets/learn2.png"
                  alt="Learn 2"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="font-chela-one text-lg">Explorer</h3>
                </div>
              </div>

              {/* Bottom right image */}
              <div className="relative group  overflow-hidden rounded-b-2xl lg:rounded-br-[80px] transition-all duration-700">
                <div className="absolute  inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 rounded-b-2xl lg:rounded-br-[80px]"></div>
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="../../src/assets/learn3.png"
                  alt="Learn 3"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="font-chela-one text-lg">Grandir</h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-sky-900 shadow-xl shadow-sky-900/10 transition-all duration-700 hover:shadow-2xl hover:shadow-sky-900/20">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-chela-one text-white leading-tight">
                  Reprenez là où vous êtes 
                  <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent mx-1.5">
                    arrêté
                  </span>,
                  votre savoir vous 
                  <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent mx-1.5">
                    attend
                  </span>
                </h2>
                
                <p className="text-gray-300 font-orienta text-base md:text-lg leading-relaxed">
                  Rejoignez notre plateforme éducative innovante conçue pour vous accompagner dans votre parcours d'apprentissage. Reprenez exactement là où vous vous étiez arrêté et découvrez de nouvelles connaissances qui vous attendent.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-4">
                  <button 
                  onClick={()=>{
                    if (token) {
                      navigate('/etudiant-dashboard');
                    } else {
                      navigate('/login');
                    }
                  }}
                    
                    className="relative cursor-pointer  overflow-hidden group border-2 border-sky-400 flex items-center gap-2 py-3 px-6 text-white rounded-full font-orienta transition-all duration-300 text-base font-medium"
                  >
                    <span className="relative z-10">Reprendre mon apprentissage</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                  </button>
                  
                  <button 
                  onClick={()=>{
                    if (token) {
                      navigate('/etudiant-dashboard');
                    } else {
                      navigate('/login');
                    }
                  }}

                    className="flex cursor-pointer items-center justify-center w-12 h-12 border-2 border-sky-400 rounded-full group hover:bg-sky-500 transition-all duration-300"
                  >
                    <PiStudentBold 
                      size={26}
                      className="text-white group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
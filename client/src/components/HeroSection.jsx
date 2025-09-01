import React, { useState } from 'react';
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  return (
    <div className='relative min-h-screen py-8 overflow-hidden'>
      {/* Background grid */}
      <div className="absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 pointer-events-none w-[80vw] max-w-3xl h-[60vh]">
        <div className="w-full h-full bg-[linear-gradient(to_right,theme(colors.sky.500)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.sky.500)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      <div className='relative z-10  flex flex-col items-center px-4'>
        {/* Heading section */}
        <div className='flex flex-col gap-4 items-center text-center mb-8 md:mb-12'>
          <div className='opacity-70 border border-gray-300 px-4 py-1 rounded-full'>
            <p className='text-gray-300 font-orienta text-sm'>#1 Coders Area</p>
          </div>
          
          <div>
            <h3 className='font-orienta text-xl md:text-2xl lg:text-3xl'>
              Débloquez votre <span className='text-primary '>potentiel</span>
            </h3>
          </div>
          
          <div>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-chela-one leading-tight'>
              Devenez développeur avec <span className='text-primary'>SmartCode</span>
            </h1>
          </div>
        </div>
        
        {/* Main content - responsive flex layout */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4'>
          {/* Left column - quote and button */}
          <div className='flex flex-col items-start gap-4 w-full  lg:w-1/4'>
            <div className='flex  gap-2'>
              <BiSolidQuoteAltLeft className='text-3xl md:text-4xl text-white flex-shrink-0' />
              <p className='text-gray-300 w-full  text-sm md:text-base lg:text-md font-orienta'>
                Développez vos compétences en programmation grâce à des cours interactifs, 
                accessibles et conçus par des experts.
              </p>
            </div>
            
            <button
            onClick={()=>{
              if(token){
                navigate('/etudiant-dashboard');
              }else{
                navigate('/login');
              }
            }}
              
              className='border-2 border-sky-300/80 flex items-center gap-1 py-2 px-4 md:px-6 text-white rounded-full font-orienta hover:bg-sky-400 transition duration-300 text-sm md:text-base'
            >
              Commencer maintenant <FaRegArrowAltCircleRight className='text-white'/>
            </button>
          </div>
          
          {/* Center column - image with blob */}
          <div className="relative w-full max-w-md lg:w-2/4 flex justify-center order-first lg:order-none my-4 lg:my-0">
            <svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M91.5,-112.7C122.3,-83.6,150.3,-57.6,157.3,-26.6C164.2,4.4,150.1,40.3,129.3,74.3C108.5,108.3,80.9,140.5,45.5,152.9C10.1,165.3,-33.1,157.8,-65.8,137.7C-98.5,117.6,-120.6,84.8,-139.5,47.4C-158.5,10.1,-174.2,-32,-157.1,-61.4C-140,-90.8,-90.1,-107.4,-48.3,-124.7C-6.5,-142.1,27.2,-160.2,61.4,-155.5C95.7,-150.8,130.4,-123.7,91.5,-112.7Z"
                transform="translate(200 200)"
                fill="#00b7ff"
              />
            </svg>
            <img
              src="../../src/assets/main-picture.png"
              alt="developer"
              className="relative z-10 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain mx-auto"
            />
          </div>
          
          {/* Right column - rating and badges */}
          <div className='flex flex-col gap-3 w-full lg:w-1/4'>
            <div className='rounded-full border border-gray-300/50 flex items-center justify-center gap-2 py-1 px-4 w-fit mx-auto'>
              <FaStar className='text-amber-400'/>
              <span>4.5/5</span>
            </div>
            
            <p className='text-gray-300 text-sm md:text-base lg:text-md font-orienta text-center'>
              Que vous soyez débutant ou confirmé,
              apprenez à votre rythme et transformez votre passion du code en carrière
            </p>
            
            <div className='flex flex-wrap justify-center gap-2 mt-1'>
              <span className='px-2 py-1 md:px-3 md:py-1 bg-sky-800/40 text-sky-200 rounded-full text-xs md:text-sm border border-sky-500/30'>React</span>
              <span className='px-2 py-1 md:px-3 md:py-1 bg-sky-800/40 text-sky-200 rounded-full text-xs md:text-sm border border-sky-500/30'>Html</span>
              <span className='px-2 py-1 md:px-3 md:py-1 bg-sky-800/40 text-sky-200 rounded-full text-xs md:text-sm border border-sky-500/30'>Css</span>
              <span className='px-2 py-1 md:px-3 md:py-1 bg-sky-800/40 text-sky-200 rounded-full text-xs md:text-sm border border-sky-500/30'>Java</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-gray-300 text-sm mb-2">Scroll to explore</span>
        <div className="w-1 h-10 bg-gradient-to-b from-primary to-transparent rounded-full relative">
          <motion.div 
            className="w-2 h-2 bg-primary rounded-full absolute top-0"
            animate={{ 
              y: [0, 20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default HeroSection;
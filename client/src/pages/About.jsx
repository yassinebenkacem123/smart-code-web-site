import React from 'react';
import { TbLogin } from "react-icons/tb";
import { MdSunny } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='relative py-16 px-15 sm:px-6 lg:px-8 '>
      {/* Container 1: What's SmartCode */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-7xl mx-auto mb-20'
      >
        <div className='flex flex-col lg:flex-row gap-10 items-center'>
          {/* Text Content */}
          <div className='lg:w-1/2'>
            <h1 className='text-4xl  md:text-5xl font-chela-one mb-6'>  
            Qu'est-ce que  <span className='text-primary'>SmartCode ?</span>
            </h1>
            <p className='text-gray-300 text-md md:text-lg leading-relaxed mb-8'>
              SmartCode est une plateforme éducative en ligne dédiée à l’apprentissage de la programmation.
              Elle propose des cours interactifs, des examens certifiants, 
              un suivi de progression, ainsi qu’un espace pour les étudiants, 
              enseignants et administrateurs afin de faciliter un apprentissage moderne, 
              structuré et accessible à tous.
            </p>
          </div>
          
          {/* Image */}
          <div className='lg:w-1/2 flex justify-center'>
            <div className='relative'>
              <div className='absolute -inset-4 bg-gradient-to-r from-sky-600 to-sky-800 rounded-xl blur-xl opacity-30'></div>
              <img 
                className='relative rounded-xl  h-80 lg:h-100  border-sky-400/60 border-1 w-full max-w-lg'
                src="../../src/assets/about-image1.png" 
                alt="about-image-1" 
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Container 2: Comment ça fonctionne */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='max-w-7xl mx-auto'
      >
        <h1 className='text-4xl md:text-5xl font-chela-one mb-16 text-center'>
          Comment ça <span className='text-primary'>Fonctionne</span>
        </h1>
        
        <div className='flex flex-col lg:flex-row gap-10'>
          {/* Colonne des étapes */}
          <div className='lg:w-1/2 space-y-8'>
            {/* Étape 1 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className='flex items-start gap-6 p-6 bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl shadow-lg shadow-sky-900/30'
            >
              <div className='bg-sky-500/40 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white text-xl font-bold'>01</span>
              </div>
              <div>
                <div className='flex items-center gap-3 mb-2'>
                  <TbLogin className='text-2xl text-sky-400' />
                  <h3 className='text-xl font-bold text-white'>Connectez-vous et commencez votre parcours</h3>
                </div>
                <p className='text-gray-300 text-md'>
                  Accédez à votre compte et commencez votre chemin pour devenir développeur grâce à notre plateforme d'apprentissage complète.
                </p>
              </div>
            </motion.div>
            {/* Étape 2 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className='flex items-start gap-6 p-6 bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl shadow-lg shadow-sky-900/30'
            >
              <div className='bg-sky-500/40 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white text-xl font-bold'>02</span>
              </div>
              <div>
                <div className='flex items-center gap-3 mb-2'>
                  <MdSunny className='text-2xl text-amber-400' />
                  <h3 className='text-xl font-bold text-white'>Améliorez votre carrière</h3>
                </div>
                <p className='text-gray-300 text-md'>
                  Améliorez vos compétences avec notre programme mis à jour pour suivre les tendances de l'industrie.
                </p>
              </div>
            </motion.div>
            
            {/* Étape 3 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className='flex items-start gap-6 p-6 bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl shadow-lg shadow-sky-900/30'
            >
              <div className='bg-sky-500/40 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white text-xl font-bold'>03</span>
              </div>
              <div>
                <div className='flex items-center gap-3 mb-2'>
                  <FaUniversity className='text-2xl text-orange-400' />
                  <h3 className='text-xl font-bold text-white'>Partenariat Universitaire</h3>
                </div>
                <p className='text-gray-300 text-md'>
                  Reconnu officiellement et en partenariat avec l'Université Sidi Mohamed Ben Abdelah de Fès pour un apprentissage certifié.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Colonne Image & Marque */}
          <div className='lg:w-1/2 flex flex-col items-center justify-center'>
            <div className='flex flex-col sm:flex-row items-center gap-8'>
              <div className='relative'>
                <div className='absolute -inset-4  bg-gradient-to-r from-sky-600 to-sky-800 rounded-xl blur-xl opacity-30'></div>
                <img 
                  className='relative rounded-xl  border border-sky-400/60 w-full max-w-xs'
                  src="../../src/assets/about-image2.png" 
                  alt="about-image-2" 
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating elements for decoration */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-sky-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-blue-600/10 rounded-full blur-3xl"></div>
    </div>
  )
}

export default About;
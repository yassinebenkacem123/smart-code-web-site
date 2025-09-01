import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const BentoGrid = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const gridItems = [
    {
      id: 1,
      title: "Notifications",
      image: "../../src/assets/notification.png",
      color: "from-sky-500/30 to-blue-600/30",
      span: "col-span-2 row-span-2",
      styling:'w-full h-[100%]'
    },
    {
      id: 2,
      title: "Expert Teachers",
      image: "../../src/assets/teacher.png",
      color: "from-sky-300/40 to-sky-400/30",
      span: "",
      styling:'w-full h-[100%]'
    },
    {
      id: 3,
      title: "Certificates",
      image: "../../src/assets/certificate.png",
      color: "from-sky-500/20 to-sky-600/20",
      span: "",
      styling:'object-cover w-full h-[80%]'
    },
    {
      id: 4,
      title: "Easy Payments",
      image: "../../src/assets/payment.png",
      color: "from-blue-500/20 to-blue-600/20",
      span: "",
      styling:' w-full object-cover h-[80%]'
    },
    {
      id: 5,
      title: "Messaging",
      image: "../../src/assets/message.png",
      color: "from-sky-500/20 to-sky-600/20",
      span: "",
      styling:'w-full relative  h-[100%]'
    },
    {
      id: 6,
      title:"Notification",
      image: "../../src/assets/progress.png",
      color: "from-sky-500/30 to-sky-700/20",
      span: "col-span-2",
      styling:''
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Title with animated gradient */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl  gap-1 flex items-center justify-center md:text-6xl font-chela-one mb-4"
          >
            SmartCode   
            <span className="text-sky-400">
             Features
            </span>
          </motion.h2>
     
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">
          {gridItems.map((item) => (
            <motion.div
              key={item.id}
              className={`relative rounded-2xl overflow-clip  ${item.span}`}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              {/* Image that fully covers the container */}
              <div className={` ${item.styling}`}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute w-full h-full  z-10"
                />
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              
              {/* Content overlay */}
              <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: hoveredItem === item.id ? 1 : 0.8,
                    y: hoveredItem === item.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/30 backdrop-blur-sm p-3 rounded-xl"
                >
                </motion.div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-sky-400 rounded-full"></div>
            </motion.div>
          ))}

          {/* Community card */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden  col-span-2 md:col-span-3 lg:col-span-2"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <div className="absolute inset-0 w-full h-full">
              <div className="bg-gradient-to-br from-cyan-500/20 to-sky-600/20 w-full h-full" />
            </div>
            
            {/* Community content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-md"
              >
                <h3 className="text-white font-bold text-2xl md:text-3xl mb-3">
                  Rejoignez Notre Communauté de Codeurs
                </h3>
                <p className="text-sky-200 text-lg mb-6">
                  Connectez-vous avec des milliers de développeurs à travers le monde
                </p>
                <button 
                onClick={()=>navigate('/login')}
                className="bg-sky-400 cursor-pointer px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                  Join Now
                </button>
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-6 left-6 w-4 h-4 bg-sky-400 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-4 h-4 bg-sky-400 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
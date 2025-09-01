import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
const VoirChapitreContent = () => {
  const location = useLocation();
  const { chapitreContent } = location.state || {};

  if (!chapitreContent) {
    return <div className="text-red-500">Aucun contenu de chapitre disponible.</div>;
  }

  return (
    <div className='h-screen p w-full bg-sky-400/30 '>
      <button 
      onClick={() => window.history.back()} 
      className='px-2 absolute top-4 left-4 flex items-center justify-center  gap-2  cursor-pointer bg-sky-500/80 hover:bg-sky-700 text-white py-2 rounded-lg '>
        <FaArrowLeft size={13} /> retourne
      </button>
       <iframe
          title="Chapitre Content"
          srcDoc={chapitreContent} // Render the HTML content inside the iframe
          style={{
            width:'100%',
            height: '100vh',
            border: 'none',
            overflow:'auto',
          }}
        >  
        </iframe>
    </div>
       
  );
};

export default VoirChapitreContent;
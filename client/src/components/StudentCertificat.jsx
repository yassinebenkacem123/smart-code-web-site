import React from 'react';

const StudentCertificat = ({ certificatData }) => {
  return (
    <div className="w-full h-130 flex items-center justify-center p-2 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200">
      <div className="w-full max-w-4xl h-full bg-black rounded-3xl overflow-hidden shadow-2xl border-8 border-sky-300 relative">
        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-sky-400"></div>
        <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-sky-400"></div>
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-sky-400"></div>
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-sky-400"></div>
        
        {/* Sky pattern background */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div className="grid grid-cols-4 grid-rows-4 h-full">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 3v7.267l6.294-3.633 1 1.732-6.293 3.633 6.293 3.635-1 1.732-6.294-3.634v7.267h-2v-7.267l-6.294 3.634-1-1.732 6.293-3.635-6.293-3.633 1-1.732 6.294 3.633v-7.267h2z"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 py-3 px-6 md:px-12">
          {/* Header */}
          <div className="text-center ">
            <div className="flex justify-center mb-2">
              <div className="w-15 h-15 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
              Certificat de Réussite
            </h1>
          </div>
          
          {/* Body */}
          <div className="text-center mb-5">
            <div className="mt-4">
              <h2 className="text-2xl md:text-2xl font-bold text-white mb-3">
                {certificatData.studentName}
              </h2>
            </div>
            
            <p className="text-gray-200 text-lg mb-4">
              a complété avec succès le cours
            </p>
            <h3 className="text-xl md:text-2xl font-semibold text-sky-700 mb-3 px-4 py-3 bg-sky-50 rounded-lg inline-block">
              {certificatData.courseName}
            </h3>
            
            <p className="text-gray-200 text-mdmax-w-2xl mx-auto mt-1">
              En reconnaissance de son dévouement, de sa persévérance et de son excellence académique
            </p>
          </div>
          
          {/* Footer */}
          <div className="flex  items-center  justify-between border-t border-sky-200 pt-5">
            <div className="md:mb-0">
              <p className="text-white mb-2">Date d'achèvement</p>
              <p className="font-semibold text-gray-300">{new Date().toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
            
            <div className="text-center mb-6 md:mb-0">
              <div className="w-32 h-20 mx-auto mb-2 bg-gradient-to-b from-white to-sky-100 border-2 border-dashed border-sky-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">Signature</span>
              </div>
            </div>
            
            <div className="text-right">
              <h1 className='text-2xl font-bold text-sky-300'>SmartCode</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCertificat;
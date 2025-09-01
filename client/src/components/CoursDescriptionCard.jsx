import React from 'react'
import { FiX, FiBookOpen } from "react-icons/fi";

const CoursDescriptionCard = ({ desc, closeDescription }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-sky-900 to-sky-800 max-w-2xl w-full rounded-xl shadow-2xl border border-sky-500/30 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-800 to-sky-700 p-5 flex items-center justify-between border-b border-sky-500/30">
            <div className="flex items-center gap-3">
              <FiBookOpen className="text-sky-300 text-xl" />
              <h2 className="text-white text-xl font-bold">Description du cours</h2>
            </div>
            <button 
              className="text-sky-300 hover:text-white p-2 rounded-full hover:bg-sky-700 transition-colors"
              onClick={() => closeDescription(false)}
            >
              <FiX className="text-xl" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="prose prose-invert prose-sky max-w-none">
              {desc.length > 0 ? (
                <div className="text-sky-200 leading-relaxed">
                  {desc.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sky-400">
                  <p>Aucune description disponible pour ce cours.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 bg-sky-900/50 border-t border-sky-500/30 flex justify-end">
            <button
              onClick={() => closeDescription(false)}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(14, 116, 144, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(56, 189, 248, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(56, 189, 248, 0.5);
        }
        .prose-sky a {
          color: #38bdf8;
        }
        .prose-sky strong {
          color: #e0f2fe;
        }
      `}</style>
    </div>
  )
}

export default CoursDescriptionCard;
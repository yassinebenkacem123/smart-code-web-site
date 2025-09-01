import React, { useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { FiMail, FiClock, FiEye, FiEyeOff } from "react-icons/fi";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import useProfessorStore from '../store/useProfessorStore';
const MessageCard = ({ message, isNew = false }) => {
  const [showEntireMessage, setShowEntireMessage] = useState(false);
  const { deleteMessageById } = useProfessorStore();
  // Format the date using date-fns with French locale
  const formattedDate = format(new Date(message.date_envoi), "d MMM yyyy 'à' HH:mm", { locale: fr });
  const isLongMessage = message.texte.length > 65;
  
  return (
    <div 
      className={`relative bg-gradient-to-br from-sky-900/20 to-blue-900/20 backdrop-blur-sm border rounded-xl p-4 mb-4 shadow-lg transition-all duration-300
        ${isNew 
          ? 'border-emerald-500/60 shadow-emerald-900/20 hover:shadow-emerald-900/30' 
          : 'border-sky-500/30 shadow-sky-900/10 hover:shadow-sky-900/20'}
      `}
    >
      {/* New message indicator */}
      {isNew && (
        <div className="absolute -top-2 -left-2">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        {/* Student Avatar */}
        <div className={`relative flex-shrink-0 ${
          isNew ? 'ring-2 ring-emerald-500/50' : ''
        }`}>
          <div className="bg-sky-900/30 border rounded-full p-3 flex items-center justify-center w-12 h-12">
            <PiStudentFill className='text-2xl text-sky-400' />
          </div>
          {isNew && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">{message.etudiant_nom}</h1>
                {isNew && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full">
                    Nouveau message
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiMail className="text-sky-400 text-sm" />
                <p className="text-sky-300 text-sm">{message.etudiant_email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sky-400 bg-sky-900/30 px-2 py-1 rounded-full text-xs">
              <FiClock className="text-sky-400" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          <div 
            className={`mt-3 p-3 rounded-lg border transition-all duration-200 ${
              isNew 
                ? 'bg-emerald-900/10 border-emerald-500/30' 
                : 'bg-sky-900/20 border-sky-500/30'
            } ${showEntireMessage ? 'max-h-[500px]' : 'max-h-24 overflow-hidden'}`}
          >
            <p className="text-sky-100 whitespace-pre-wrap">
              {showEntireMessage ? message.texte : (
                isLongMessage ? message.texte.slice(0, 65) + '...' : message.texte
              )}
            </p>
            
            {isLongMessage && (
              <div className="mt-2 flex justify-end">
                <button 
                  onClick={() => setShowEntireMessage(!showEntireMessage)}
                  className="flex items-center text-xs text-sky-400 hover:text-sky-300 transition-colors"
                >
                  {showEntireMessage ? (
                    <>
                      <FiEyeOff className="mr-1" /> Réduire
                    </>
                  ) : (
                    <>
                      <FiEye className="mr-1" /> Voir plus
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                const subject = encodeURIComponent("Réponse à votre message");
                const body = encodeURIComponent(`Bonjour ${message.etudiant_nom},\n\n`);
                const mailto = `mailto:${message.etudiant_email}?subject=${subject}&body=${body}`;
                window.location.href = mailto;
              }}
              className="flex items-center text-xs cursor-pointer bg-sky-700/40 hover:bg-sky-700 text-sky-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <FiMail className="mr-1.5" /> Répondre
            </button>
            <button 
            onClick={() => deleteMessageById(message.message_id)}
            className='flex items-center text-xs cursor-pointer bg-red-700/40 hover:bg-red-700 text-red-200 px-3 py-1.5 rounded-lg transition-colors'>
                supprimer Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageCard;
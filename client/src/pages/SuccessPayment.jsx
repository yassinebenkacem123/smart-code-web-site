import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaGraduationCap, FaStar, FaCloud } from 'react-icons/fa';

const SuccessPayment = () => {
  const [params] = useSearchParams();
  const cours_id = params.get("cours_id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const confirmerPaiement = async () => {
      if (!cours_id || !token) return;

      try {
        const res = await fetch("/api/stripe/confirmer-paiement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cours_id }),
        });

        const data = await res.json();
        if (data.success) {
          return toast.success(data.message || "Paiement confirmé avec succès.");
        } else {
          return;
        }
      } catch (err) {
        console.error(err);
        return toast.error("Erreur lors de la confirmation du paiement.");
      }
    };
    confirmerPaiement();
  }, []); // Ensure no dependencies are added to avoid re-triggering

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">      
     
      <div className="max-w-3xl w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-sky-800"
        >
          {/* Sky-themed header */}
          <div className="bg-gradient-to-r from-sky-800 to-sky-600 px-1 py-4 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.1, 1] }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block relative"
            >
              <div className="bg-sky-900 border-2 border-sky-600 rounded-full p-4 shadow-lg inline-block relative z-10">
                <FaCheckCircle className="text-6xl text-sky-400" />
              </div>
              <motion.div 
                className="absolute inset-0 bg-sky-500 rounded-full opacity-0"
                animate={{ 
                  scale: [1, 2],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mt-3 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Paiement Réussi !
            </motion.h1>
          </div>
          
          {/* Content */}
          <div className="px-4 py-4 md:p-12">
            <motion.p 
              className="text-lg text-center text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Félicitations ! Votre inscription au cours a été confirmée. Vous pouvez maintenant accéder à votre nouveau cours.
            </motion.p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gradient-to-r from-sky-400 cursor-pointer to-sky-500 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:from-sky-500 hover:to-sky-600"
                onClick={() => navigate("/etudiant-dashboard/cours")}
              >
                <FaGraduationCap className="text-xl" />
                Accéder à mes cours
                <FaArrowRight className="ml-2" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-black border-2 border-sky-600 text-white rounded-2xl cursor-pointer font-bold shadow-lg flex items-center justify-center gap-3 transition-all hover:bg-gray-900"
                onClick={() => navigate("/")}
              >
                Retour à l'accueil
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Additional info cards */}
        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-sky-800">
            <div className="bg-sky-900 text-sky-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-sky-400 mb-2">Accès immédiat</h3>
            <p className="text-gray-400">Votre cours est disponible dès maintenant dans votre tableau de bord étudiant.</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-sky-800">
            <div className="bg-sky-900 text-sky-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-sky-400 mb-2">Paiement sécurisé</h3>
            <p className="text-gray-400">Votre transaction a été traitée de manière sécurisée via Stripe.</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-sky-800">
            <div className="bg-sky-900 text-sky-400 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-sky-400 mb-2">Support disponible</h3>
            <p className="text-gray-400">Notre équipe est à votre disposition pour toute question concernant votre cours.</p>
          </div>
        </motion.div>
        
      </div>
    
    </div>
  );
};

export default SuccessPayment;
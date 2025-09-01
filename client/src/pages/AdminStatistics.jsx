import { useEffect } from "react";
import { FaChalkboardTeacher, FaUserShield, FaBook, FaChartLine, FaMedal, FaTable } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { motion } from "framer-motion";
import useAdminStore from "../store/useAdminData";
import Loading from "../components/Loading";
const AdminStatistics = () => {
  const { stats, loading, fetchStats, error } = useAdminStore();
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return (
    <Loading>Chargement des données...</Loading>
  );
  if (error) return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="bg-red-900/30 border border-red-500/30 p-8 rounded-2xl max-w-md text-center shadow-lg shadow-red-900/30">
        <h2 className="text-2xl font-bold text-red-300 mb-4">Erreur de chargement</h2>
        <p className="text-red-200 mb-6">{error}</p>
        <button 
          onClick={fetchStats}
          className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
  
  if (!stats) return null;

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] w-full h-screen overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <FaChartLine className="text-sky-400" />
            Tableau de Bord Statistique
          </h2>
          <div className="text-sky-300 text-sm bg-sky-900/30 px-3 py-1 rounded-full border border-sky-500/30">
            Données en temps réel
          </div>
        </div>
      </motion.div>

     {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard 
          label="Étudiants" 
          value={stats.total_etudiants} 
          icon={<PiStudentFill  className='text-xl'/>}
          color="from-sky-600/70 to-sky-500/70"
        />
        <StatCard 
          label="Enseignants" 
          value={stats.total_enseignants} 
          icon={<FaChalkboardTeacher className="text-xl" />}
          color="from-emerald-600/60 to-teal-700/60"
        />
        <StatCard 
          label="Admins" 
          value={stats.total_admins} 
          icon={<FaUserShield className="text-xl" />}
          color="from-violet-600/60 to-purple-700/60"
        />
        <StatCard 
          label="Cours" 
          value={stats.total_cours} 
          icon={<FaBook className="text-xl" />}
          color="from-amber-600/80 to-yellow-700/80"
        />
      </div>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Courses Table */}
        <div className="bg-gradient-to-br w-[100%] from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl p-6 shadow-lg shadow-sky-900/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaTable className="text-sky-400" />
              Inscriptions par Cours
            </h3>
            <span className="text-sky-300 text-sm">{stats.etudiants_par_cours.length} cours</span>
          </div>
          
          <div className="h-full overflow-y-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-sky-800/50 text-sky-300">
                  <th className="px-4 py-3 text-left border-b border-sky-500/30">#</th>
                  <th className="px-4 py-3 text-left border-b border-sky-500/30">Cours</th>
                  <th className="px-4 py-3 text-left border-b border-sky-500/30">Enseignant</th>
                  <th className="px-4 py-3 text-center border-b border-sky-500/30">Inscrits</th>
                </tr>
              </thead>
              <tbody>
                {stats.etudiants_par_cours.map((c, i) => (
                  <motion.tr 
                    key={c.cours_id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-sky-500/20 hover:bg-sky-800/20"
                  >
                    <td className="px-4 py-3 text-sky-300">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-white">{c.titre}</td>
                    <td className="px-4 py-3 text-sky-300">{c.enseignant}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium text-white mr-2">{c.total_etudiants_inscrits}</span>
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-sky-500 to-blue-600 h-2 rounded-full" 
                            style={{ width: `${(c.total_etudiants_inscrits / stats.total_etudiants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Top Courses */}
        <div className="bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-2xl p-6 shadow-lg shadow-sky-900/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaMedal className="text-amber-400" />
              Cours les Plus Populaires
            </h3>
            <span className="text-sky-300 text-sm">Top {stats.top_cours.length}</span>
          </div>
          
          <div className="space-y-4">
            {stats.top_cours.map((c, index) => (
              <motion.div 
                key={c.cours_id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-sky-800/20 border border-sky-500/20 rounded-xl p-4 hover:bg-sky-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-br from-amber-400/70 to-yellow-400/70' : 
                    index === 1 ? 'bg-gradient-to-br from-gray-500 to-gray-600' : 
                    index === 2 ? 'bg-gradient-to-br from-amber-800 to-yellow-900' : 
                    'bg-sky-700/50'
                  }`}>
                    <span className="font-bold text-white text-lg">#{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{c.titre}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-sky-300 text-sm">{c.inscrits} inscrits</div>
                      <div className="w-16 bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-1.5 rounded-full" 
                          style={{ width: `${(c.inscrits / stats.top_cours[0].inscrits) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const StatCard = ({ label, value, icon, color, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-gradient-to-br ${color} rounded-2xl p-5 shadow-lg overflow-hidden relative`}
  >
    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full"></div>
    
    <div className="relative z-10 flex flex-col">
      <div className="flex justify-between items-start">
        <div className="bg-white/10 p-3 rounded-xl mb-4">
          {icon}
        </div>
        <span className="text-sm bg-white/10 px-2 py-1 rounded-full text-white">{trend}</span>
      </div>
      
      <div className="mt-2">
        <p className="text-sky-200 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default AdminStatistics;
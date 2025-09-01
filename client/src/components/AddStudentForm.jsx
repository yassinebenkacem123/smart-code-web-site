import React, { useState } from 'react';
import useAdminStore from '../store/useAdminData';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

const AddStudentForm = ({ setOpenStudentForm }) => {
  const { addStudent, studentsError, studentLoading } = useAdminStore();
  const [form, setForm] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
    date_naissance: '',
    date_inscription_ecole: '',
    genre: '',
    telephone: '',
    adress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addStudent(form);
    if (response.success) {
      toast.success(response.message);
      setForm({
        nom: '',
        email: '',
        mot_de_passe: '',
        date_naissance: '',
        date_inscription_ecole: '',
        genre: '',
        telephone: '',
        adress: '',
      });
      setOpenStudentForm(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/30 rounded-xl shadow-xl shadow-sky-900/30 w-full max-w-2xl">
        <button 
          onClick={() => setOpenStudentForm(false)}
          className="absolute top-4 cursor-pointer right-4 text-sky-300 hover:text-white transition-colors"
        >
          <FaTimes className="text-xl" />
        </button>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Ajouter un nouvel étudiant</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="nom">
                Nom Complet *
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                value={form.nom}
                onChange={handleChange}
                placeholder="Nom de famille"
                required
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Adresse email"
                required
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="mot_de_passe">
                Mot de passe *
              </label>
              <input
                id="mot_de_passe"
                name="mot_de_passe"
                type="password"
                value={form.mot_de_passe}
                onChange={handleChange}
                placeholder="Créer un mot de passe"
                required
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="genre">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                required
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Sélectionner un genre</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="date_naissance">
                Date de naissance *
              </label>
              <input
                id="date_naissance"
                name="date_naissance"
                type="date"
                value={form.date_naissance}
                onChange={handleChange}
                required
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="date_inscription_ecole">
                Date d'inscription *
              </label>
              <input
                id="date_inscription_ecole"
                name="date_inscription_ecole"
                type="date"
                value={form.date_inscription_ecole}
                onChange={handleChange}
                required
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="telephone">
                Téléphone 
              </label>
              <input
                id="telephone"
                name="telephone"
                type="text"
                value={form.telephone}
                onChange={handleChange}
                placeholder="Numéro de téléphone"
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label className="block text-sky-300 text-sm font-medium mb-2" htmlFor="adress">
                Adresse
              </label>
              <input
                id="adress"
                name="adress"
                type="text"
                value={form.adress}
                onChange={handleChange}
                placeholder="Adresse complète"
                className="w-full bg-sky-900/30 backdrop-blur-sm border border-sky-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setOpenStudentForm(false)}
              className="bg-red-700/30 hover:bg-red-700/50 cursor-pointer text-red-300 px-5 py-2 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={studentLoading}
              className="bg-sky-700/50 cursor-pointer hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition-colors flex items-center justify-center"
            >
              {studentLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </span>
              ) : (
                "Ajouter l'étudiant"
              )}
            </button>
          </div>
          
          {studentsError && (
            <div className="mt-4 text-red-400 bg-red-900/30 p-3 rounded-lg text-sm">
              {studentsError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
import React, { useState } from 'react';
import useProfessorStore from '../store/useProfessorStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiPlus, FiFile, FiArrowLeft, FiFileText, FiBookOpen } from 'react-icons/fi';

const AjoutChapitre = () => {
  const [nbr_chapitres, setNbrChapitres] = useState(1);
  const location = useLocation();
  const { coursId } = location.state || {};
  const navigate = useNavigate();
  const { loading, error, addChapitres } = useProfessorStore();

  const [formData, setFormData] = useState(
    Array.from({ length: nbr_chapitres }, () => ({
      titre: '',
      description: '',
      contenu: null,
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...formData];
    updated[index][field] = value;
    setFormData(updated);
  };

  const handleFileChange = (index, file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      handleInputChange(index, 'contenu', e.target.result);
    };
    reader.readAsText(file);
    
    // Update file name display
    handleInputChange(index, 'fileName', file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chapitres = formData.map((chap, i) => ({
      ...chap,
      ordre: i + 1,
      cours_id: coursId
    }));
    await addChapitres(chapitres);
    setFormData(
      Array.from({ length: nbr_chapitres }, () => ({
        titre: '',
        description: '',
        contenu: null,
        fileName: '',
      }))
    );
    setNbrChapitres(1);
  };

  const updateChapterCount = (count) => {
    setNbrChapitres(count);
    setFormData(
      Array.from({ length: count }, (_, i) => formData[i] || {
        titre: '',
        description: '',
        contenu: null,
        fileName: '',
      })
    );
  };

  return (
    <div className="w-full mx-auto p-6 overflow-y-auto bg-gradient-to-br from-sky-900/10 to-blue-900/10">
      <button
        onClick={() => window.history.back()}
        className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-sky-800/50 text-sky-200 rounded-lg hover:bg-sky-700/50 transition-colors mb-6 shadow-md"
      >
        <FiArrowLeft /> Retour
      </button>
      
      <div className="flex items-center gap-3 mb-6">
        <FiBookOpen className="text-2xl text-sky-400" />
        <h1 className="text-2xl font-bold text-white">Ajouter des Chapitres</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-sky-900/20 p-5 rounded-xl border border-sky-500/30">
          <label className="block text-lg font-medium text-sky-200 mb-3 flex items-center gap-2">
            <FiPlus /> Nombre de Chapitres
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={nbr_chapitres}
              onChange={(e) => updateChapterCount(Number(e.target.value))}
              className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sky-400">
              Chapitres
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {formData.map((chap, index) => (
            <div key={index} className="bg-sky-900/20 p-5 rounded-xl border border-sky-500/30">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-sky-500/30">
                <div className="w-8 h-8 rounded-full bg-sky-700/50 flex items-center justify-center">
                  <span className="text-sky-300 font-bold">{index + 1}</span>
                </div>
                <h2 className="text-xl font-semibold text-sky-200">Chapitre {index + 1}</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sky-300 mb-2">Titre du chapitre</label>
                  <input
                    type="text"
                    value={chap.titre}
                    onChange={(e) => handleInputChange(index, 'titre', e.target.value)}
                    placeholder={`Saisissez le titre du chapitre ${index + 1}`}
                    className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sky-300 mb-2">Description</label>
                  <textarea
                    value={chap.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    placeholder={`Décrivez le contenu du chapitre ${index + 1}`}
                    className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sky-300 mb-2">Contenu (fichier HTML)</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <label className="flex flex-col items-center justify-center w-full sm:w-64 h-32 border-2 border-sky-500/30 border-dashed rounded-lg cursor-pointer bg-sky-900/30 hover:bg-sky-900/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiFileText className="w-8 h-8 mb-2 text-sky-400" />
                        <p className="text-sm text-sky-300">Télécharger fichier</p>
                        <p className="text-xs text-sky-400/80 mt-1">HTML uniquement</p>
                      </div>
                      <input
                        type="file"
                        accept=".html"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </label>
                    
                    {chap.fileName && (
                      <div className="flex-1 bg-sky-900/30 rounded-lg p-4 border border-sky-500/30">
                        <p className="text-sky-300 font-medium flex items-center gap-2">
                          <FiFile className="text-sky-400" /> Fichier sélectionné:
                        </p>
                        <p className="text-sky-400 mt-1 truncate">{chap.fileName}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="ml-auto px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 cursor-pointer text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            Ajouter les Chapitres
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjoutChapitre;
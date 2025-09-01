import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProfessorStore from '../store/useProfessorStore';
import { FiArrowLeft, FiUpload, FiLink } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
const AjoutCours = () => {
  const [isExternalLink, setIsExternalLink] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const { addCours, error, loading, editCours, updateCours} = useProfessorStore();
  const location = useLocation();
  const {course} = location.state || {};
  const [dataForm, setDataForm] = useState(
    editCours ? {
      titre: course.titre,
      prix: course.prix,
      description: course.description,
      imageLink: course.image_url || '',
      imageFile: null,
    } : {
      titre: '',
      prix: '',
      description: '',
      imageLink: '',
      imageFile: null,
    }
  );

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      const file = files[0];
      setDataForm({ ...dataForm, [name]: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setDataForm({ ...dataForm, [name]: value });
    }
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coursData = {
      titre: dataForm.titre,
      prix: dataForm.prix,
      description: dataForm.description,
      image_type: isImageUpload ? 'upload' : 'url',
      image_url: isExternalLink ? dataForm.imageLink : '',
      imageFile: isImageUpload ? dataForm.imageFile : null,
    };
    if(!editCours){
      const coursId =  await addCours(coursData);
      setDataForm({ titre: '', prix: '', description: '', imageLink: '', imageFile: null });
      setImagePreview(null);
      if (error === null || error.length === 0) {
        navigate('/enseignant-dashboard/courses/ajout-chapitre',{state: { coursId } });
      }
    }else{
      await updateCours(course.id, coursData);
      setDataForm({ titre: '', prix: '', description: '', imageLink: '', imageFile: null });
      setImagePreview(null);
    }
    
    
  }

  return (
    <div className="p-5 w-full overflow-y-auto bg-gradient-to-br from-sky-900/20 to-blue-900/20">
      <button
        className="flex  cursor-pointer items-center gap-2 px-4 py-2  hover:scle-110 hover:text-sky-400 text-sky-300 rounded-lg  transition-colors mb-6"
        onClick={() => window.history.back()}
      >
        <FiArrowLeft className="text-lg" /> Retour
      </button>

      <h1 className="text-2xl font-bold text-white mb-6">
        {editCours ? 'Edit Cours':'Ajout Un Cours'}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className='bg-sky-900/20 p-5 rounded-xl border border-sky-500/30'>
            <label className="block text-sm font-medium text-sky-200 mb-2">Titre du Cours</label>
            <input
              type="text"
              name="titre"
              value={dataForm.titre}
              required
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Entrez le titre du cours"
            />
          </div>
          
          <div className='bg-sky-900/20 p-5 rounded-xl border border-sky-500/30'>
            <label className="block text-sm font-medium text-sky-200 mb-2">Prix (MAD)</label>
            <input
              onChange={handleInputChange}
              name="prix"
              value={dataForm.prix}
              type="number"
              required
              className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Entrez le prix du cours"
            />
          </div>
        </div>
        
        <div className='bg-sky-900/20 p-5 rounded-xl border border-sky-500/30'>
          <label className="block text-sm font-medium text-sky-200 mb-2">Description</label>
          <textarea
            onChange={handleInputChange}
            name="description"
            required
            value={dataForm.description}
            rows="4"
            className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Décrivez le contenu de votre cours..."
          ></textarea>
        </div>
        
        <div className="p-5 bg-sky-900/20 rounded-xl border border-sky-500/30">
          <h3 className="text-lg font-medium text-sky-200 mb-4">Image du cours</h3>
          
          <div className="flex flex-wrap gap-6 mb-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isExternalLink}
                  onChange={() => {
                    setIsExternalLink(!isExternalLink);
                    setIsImageUpload(false);
                    setImagePreview(null);
                  }}
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isExternalLink 
                    ? 'bg-sky-500 border-sky-500' 
                    : 'bg-transparent border-sky-400'
                }`}>
                  {isExternalLink && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                </div>
              </div>
              <span className="ml-2 text-sky-200 flex items-center">
                <FiLink className="mr-2" /> Lien externe
              </span>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isImageUpload}
                  onChange={() => {
                    setIsImageUpload(!isImageUpload);
                    setIsExternalLink(false);
                  }}
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  isImageUpload 
                    ? 'bg-sky-500 border-sky-500' 
                    : 'bg-transparent border-sky-400'
                }`}>
                  {isImageUpload && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                </div>
              </div>
              <span className="ml-2 text-sky-200 flex items-center">
                <FiUpload className="mr-2" /> Importer une image
              </span>
            </label>
          </div>
          
          {isExternalLink && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-sky-200 mb-2">Lien de l'image</label>
              <input
                onChange={handleInputChange}
                required
                name="imageLink"
                type="text"
                value={dataForm.imageLink}
                className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="https://exemple.com/image.jpg"
              />
            </div>
          )}
          
          {isImageUpload && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-sky-200 mb-2">Choisir une image</label>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-sky-500/30 border-dashed rounded-lg cursor-pointer bg-sky-900/30 hover:bg-sky-900/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-3 text-sky-400" />
                      <p className="text-sm text-sky-300">Glissez-déposez ou cliquez pour télécharger</p>
                      <p className="text-xs text-sky-400/80 mt-2">PNG, JPG, JPEG (Max. 5MB)</p>
                    </div>
                    <input 
                      onChange={handleInputChange}
                      required
                      name="imageFile"
                      type="file" 
                      className="hidden" 
                    />
                  </label>
                </div>
                
                {imagePreview && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-sky-200 mb-2">Aperçu</label>
                    <div className="border border-sky-500/30 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 cursor-pointer text-white rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            {editCours ? 'Mettre à jour le cours' : 'Ajouter le cours'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-300 text-center">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AjoutCours;
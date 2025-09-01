import { useState } from "react";
import useProfessorStore from "../store/useProfessorStore";
const ProfessorSendMessageBox = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Track the selected option
  const {sendMessage} = useProfessorStore();
  const [formData, setFormData] = useState({
    titre:'',
    etudiant_email: '',
    message:''
  })
  const handleOnChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(selectedOption === "oneStudent" && !formData.etudiant_email) {
      alert("Veuillez saisir l'email de l'étudiant");
      return;
    }
    sendMessage(formData);
    setFormData({
      titre: '',
      etudiant_email: '',
      message: ''
    });
    setSelectedOption('');
  }
  return (
    <div>
      <h2>Répondre aux Messages de Vos Etudiants</h2>
      <form 
      onSubmit={handleSubmit}
      action="">
        <div>
          <label htmlFor="">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleOnChange}
            required
            placeholder="Saisissez le titre de votre message"
            className="w-full px-4 mt-2 py-2 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div>
          <label htmlFor="">Message</label>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleOnChange}
            placeholder="Saisissez votre message ici"
            className="w-full px-4 mt-2 py-2 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedOption === "oneStudent"}
              onChange={() =>
                setSelectedOption(
                  selectedOption === "oneStudent" ? "" : "oneStudent"
                )
              }
            />
            Envoyer à un étudiant spécifique
          </label>
          {selectedOption === "oneStudent" && (
            <input
              type="text"
              value={formData.etudiant_email}
              onChange={handleOnChange}
              name="etudiant_email"
              placeholder="Saisissez l'email de l'étudiant"
              className="w-full px-4 py-2 mt-2 mb-2 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          )}
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedOption === "allStudents"}
              onChange={() =>
                setSelectedOption(
                  selectedOption === "allStudents" ? "" : "allStudents"
                )
              }
            />
            Envoyer à tous les étudiants
          </label>
          {selectedOption === "allStudents" && (
            <p className="text-sky-400 text-sm">
              Ce message sera envoyé à tous les étudiants inscrits à vos cours.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="
                bg-sky-700 mt-3 cursor-pointer hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors 
                focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ProfessorSendMessageBox;
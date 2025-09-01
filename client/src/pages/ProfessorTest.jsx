import { useState } from "react";
import { FiBook, FiChevronDown, FiPlus, FiCheckCircle, FiSave } from "react-icons/fi";
import useProfessorStore from "../store/useProfessorStore";
import { useEffect } from "react";
const ProfessorTest = () => {
  const {addQuestions,fetchCoursesWithChapters, loading,courses} = useProfessorStore();
  useEffect(()=>{
    fetchCoursesWithChapters();
  },[])
  const responseKey = ['A', 'B', 'C', 'D'];
  const numberQuestion = [2,3, 4, 5, 6, 7, 8];
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [numberReponses, setNumberResponses] = useState(2);
  const [questions, setQuestions] = useState([]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(Number(e.target.value));
    setSelectedChapterId(null);
    setNumberOfQuestions(0);
    setQuestions([]);
  };

  const handleChapterChange = (e) => {
    setSelectedChapterId(Number(e.target.value));
    setNumberOfQuestions(0);
    setQuestions([]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    if (!newQuestions[index]) newQuestions[index] = { answers: [] };
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    if (!newQuestions[qIndex]) newQuestions[qIndex] = { answers: [] };
    
    if (!newQuestions[qIndex].answers[aIndex]) {
      newQuestions[qIndex].answers[aIndex] = { text: value, correct: false };
    } else {
      newQuestions[qIndex].answers[aIndex].text = value;
    }
    
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    if (!newQuestions[qIndex]) return;

    // Update all answers in this question
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((ans, idx) => ({
      ...ans,
      correct: idx === aIndex, // Mark only the selected answer as correct
    }));

    // Set bonne_reponse based on the selected correct answer
    newQuestions[qIndex].bonne_reponse = responseKey[aIndex];

    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!selectedChapterId || questions.length === 0) {
      alert("Veuillez sélectionner un chapitre et ajouter des questions.");
      return;
    }

    const preparedQuestions = questions.map((question) => ({
      chapitre_id: selectedChapterId,
      texte_question: question.text,
      option_a: question.answers[0]?.text || "",
      option_b: question.answers[1]?.text || "",
      option_c: question.answers[2]?.text || "",
      option_d: question.answers[3]?.text || "",
      bonne_reponse: question.bonne_reponse || "", // Use bonne_reponse from state
    }));

    try {
      await addQuestions({ questions: preparedQuestions });
      setNumberOfQuestions(0);
      setQuestions([]);
    } catch (error) {
      console.error("Erreur lors de l'ajout des questions:", error);
    }
  };

  const selectedCourse = courses.find(course => course.id === selectedCourseId);
  const selectedChapter = selectedCourse?.chapitres.find(ch => ch.id === selectedChapterId);

  return (
    <div className="min-h-full w-full relative  bg-gradient-to-br from-sky-900/10 to-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="bg-sky-700/30 p-2 rounded-lg self-start">
            <FiBook className="text-2xl text-sky-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Ajouter un Test</h1>
            <p className="text-sky-300 text-sm sm:text-base">
              Créez un test relié à un chapitre spécifique de votre cours
            </p>
          </div>
        </div>

        {/* Course & Chapter Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Course Selection */}
          <div className="bg-sky-900/20 p-4 rounded-xl border border-sky-500/30">
            <label className="text-sm font-medium text-sky-300 mb-2 flex items-center gap-2">
              <FiBook className="text-sky-400" /> Sélectionnez un cours
            </label>
            <div className="relative">
              <select
                value={selectedCourseId || ""}
                onChange={handleCourseChange}
                className="w-full px-4 pl-10 py-3 rounded-lg border border-sky-500/30 bg-sky-900/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="" disabled className="bg-sky-900">
                  -- Sélectionnez un cours --
                </option>
                {courses.map(course => (
                  <option key={course.id} value={course.id} className="bg-sky-900">
                    {course.titre}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-3.5 text-sky-400 pointer-events-none" />
            </div>
          </div>

          {/* Chapter Selection */}
          {selectedCourse && (
            <div className="bg-sky-900/20 p-4 rounded-xl border border-sky-500/30">
              <label className="block text-sm font-medium text-sky-300 mb-2">
                Sélectionnez un chapitre
              </label>
              <div className="relative">
                <select
                  value={selectedChapterId || ""}
                  onChange={handleChapterChange}
                  className="w-full px-4 pl-10 py-3 rounded-lg border border-sky-500/30 bg-sky-900/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="" disabled className="bg-sky-900">
                    -- Sélectionnez un chapitre --
                  </option>
                  {selectedCourse.chapitres.map(chapitre => (
                    <option key={chapitre.id} value={chapitre.id} className="bg-sky-900">
                      {chapitre.titre}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3.5 text-sky-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Chapter & Questions Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Chapter Selected */}
          {selectedChapter && (
            <div className="bg-sky-900/20 p-4 rounded-xl border border-sky-500/30">
              <div className="flex items-center gap-3">
                <div className="bg-sky-700/30 w-10 h-10 rounded-full flex items-center justify-center">
                  <FiBook className="text-sky-300" />
                </div>
                <div>
                  <h3 className="text-sky-200 font-medium">Chapitre sélectionné</h3>
                  <p className="text-sky-400">{selectedChapter.titre}</p>
                </div>
              </div>
            </div>
          )}

          {/* Number of Questions */}
          {selectedChapter && (
            <div className="bg-sky-900/20 p-4 rounded-xl border border-sky-500/30">
              <label className="block text-sm font-medium text-sky-300 mb-2">
                Nombre de questions
              </label>
              <div className="relative">
                <select
                  value={numberOfQuestions || ""} // Ensure the default value is empty
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-sky-500/30 bg-sky-900/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="" disabled className="bg-sky-900 text-center">
                    -- Sélectionnez Le Nombre De Questions --
                  </option>
                  {numberQuestion.map(num => (
                    <option key={num} value={num} className="bg-sky-900">
                      {num} questions
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3.5 text-sky-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Questions Section */}
        {numberOfQuestions > 0 && (
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiPlus className="text-sky-400" /> Questions du Test
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sky-400 bg-sky-900/30 px-3 py-1 rounded-full text-sm">
                  {numberOfQuestions} question{numberOfQuestions > 1 ? 's' : ''}
                </span>
                <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg cursor-pointer hover:from-sky-600 hover:to-sky-700 transition-all shadow-md font-medium flex items-center gap-2 text-sm">
                  <FiSave className="text-lg" /> {loading ? "Enregistrement..." : "Enregistrer les questions"}

                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {Array.from({ length: numberOfQuestions }, (_, index) => (
                <div key={index} className="bg-sky-900/20 p-5 rounded-xl border border-sky-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-sky-700/50 flex items-center justify-center">
                      <span className="text-sky-300 font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-medium text-sky-200">Question {index + 1}</h3>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-sky-300 mb-2">
                      Énoncé de la question
                    </label>
                    <input
                      type="text"
                      value={questions[index]?.text || ""}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      placeholder={`Entrez la question ${index + 1}`}
                      className="w-full px-4 py-3 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-sky-300 mb-2">
                      Nombre de réponses
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[2, 3, 4].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setNumberResponses(num)}
                          className={`px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                            numberReponses === num
                              ? 'bg-sky-600 text-white'
                              : 'bg-sky-900/30 text-sky-300 hover:bg-sky-800/50'
                          }`}
                        >
                          {num} réponses
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sky-300 mb-3">
                      Options de réponse
                    </label>
                    <div className="space-y-3">
                      {Array.from({ length: numberReponses }, (_, responseIndex) => (
                        <div key={responseIndex} className="flex flex-col sm:flex-row items-start gap-3">
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-8 h-8 rounded-lg bg-sky-800/50 flex items-center justify-center shrink-0">
                              <span className="text-sky-300 font-bold">
                                {responseKey[responseIndex]}
                              </span>
                            </div>
                            <input
                              type="text"
                              value={questions[index]?.answers?.[responseIndex]?.text || ""}
                              onChange={(e) => handleAnswerChange(index, responseIndex, e.target.value)}
                              placeholder={`Option ${responseKey[responseIndex]}`}
                              className="w-full px-4 py-2 bg-sky-900/30 border border-sky-500/30 rounded-lg text-white placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                          </div>
                          <label className="flex items-center cursor-pointer p-2 sm:pl-0">
                            <input
                              type="radio"
                              name={`question-${index}-correct`}
                              checked={questions[index]?.answers?.[responseIndex]?.correct || false}
                              onChange={() => handleCorrectAnswerChange(index, responseIndex)}
                              className="sr-only"
                            />
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                questions[index]?.answers?.[responseIndex]?.correct
                                  ? "bg-sky-500 border-sky-500"
                                  : "bg-transparent border-sky-400"
                              }`}
                            >
                              {questions[index]?.answers?.[responseIndex]?.correct && (
                                <FiCheckCircle className="text-white text-sm" />
                              )}
                            </div>
                            <span className="ml-2 text-sky-300 text-sm hidden sm:block">
                              Correcte
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:justify-end">
              <button onClick={handleSubmit} 
              className="px-6 py-3 bg-gradient-to-r  from-sky-500 to-sky-600 text-white rounded-lg cursor-pointer hover:from-sky-600 hover:to-sky-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2 w-full sm:w-auto justify-center">
                <FiSave className="text-lg" /> 
                {loading ? "Enregistrement..." : "Enregistrer les questions"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorTest;
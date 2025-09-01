import React, {useEffect, useState } from 'react';
import useStudentStore from '../store/useStudentStore';
import { Loader } from 'lucide-react';

const TestPart = ({ chapitreId}) => {
  const {
    questionsForTest,
    loading,
    error,
    testResult,
  getQuestionsForTest,
  resetTestState,
    submitAnswersForChapitre,
    markChapterAsCompleted
  } = useStudentStore();

  const [answers, setAnswers] = useState({});
  // const [testResult, setResult] = useState(null);
  const handleSelect = (questionId, reponse) =>
    setAnswers((prev) => ({ ...prev, [questionId]: reponse }));

  const handleSubmit = async () => {
    const formatted = Object.entries(answers).map(([question_id, reponse_donnee]) => ({
      question_id: +question_id,
      reponse_donnee,
    }));
    await submitAnswersForChapitre(chapitreId, formatted);
    await markChapterAsCompleted(chapitreId);

    setAnswers({});

  };
  // On chapter change: clear previous test state and fetch fresh questions
  useEffect(() => {
    if (chapitreId == null) return;
    if (typeof resetTestState === 'function') resetTestState();
    if (typeof getQuestionsForTest === 'function') getQuestionsForTest(chapitreId);
    setAnswers({});
  }, [chapitreId]);
  return (
    <div className="w-full min-h-screen  overflow-y-auto text-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
        Évaluez Votre Niveau d'Apprentissage
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Loader className="size-12 animate-spin text-sky-400" />
          <p className="text-sky-300 text-xl font-medium">Chargement des questions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <div className="text-red-400 text-lg bg-red-900/30 inline-block px-6 py-3 rounded-xl">
            {error}
          </div>
        </div>
      ) : testResult
      ? (
        <div className="max-w-2xl mx-auto bg-gray-900/50  rounded-2xl border border-sky-800/30 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-sky-300 mb-2">
              Votre score : <span className="text-4xl bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">{testResult.score}%</span>
            </h2>
            <p className="text-lg text-sky-200">
              {testResult.bonnes} bonnes réponses sur {testResult.total}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-sky-400 border-b border-sky-800/50 pb-2">
              Détails des réponses :
            </h3>
            {testResult.details.map((q, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border ${
                  q.est_correct 
                    ? 'bg-emerald-900/20 border-emerald-700' 
                    : 'bg-rose-900/20 border-rose-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sky-300 font-medium">Q{q.question_id}:</span> 
                    <span className="ml-2 text-gray-200">{q.reponse_donnee}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    q.est_correct ? 'bg-emerald-800 text-emerald-200' : 'bg-rose-800 text-rose-200'
                  }`}>
                    {q.est_correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                {!q.est_correct && (
                  <p className="mt-2 text-sm text-gray-300">
                    <span className="text-sky-300">Bonne réponse :</span> {q.bonne_reponse}
                  </p>
                )}
              </div>
            ))}

          </div>
        </div>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {questionsForTest.length > 0 ? (
            <>
              {questionsForTest.map((question, index) => (
                <div 
                  key={question.id} 
                  className="bg-gray-900/50 backdrop-blur-sm border border-sky-800/30 rounded-2xl p-6 shadow-lg shadow-sky-900/10"
                >
                  <p className="text-xl font-semibold mb-5 text-sky-300 flex">
                    <span className="bg-sky-900/50 border border-sky-700/50 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                      {index + 1}
                    </span>
                    {question.texte_question}
                  </p>
                  <ul className="space-y-3">
                    {['a', 'b', 'c', 'd'].map(letter => {
                      const value = question[`option_${letter}`];
                      return value ? (
                        <li
                          key={letter}
                          onClick={() => handleSelect(question.id, letter.toUpperCase())}
                          className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 ${
                            answers[question.id] === letter.toUpperCase()
                              ? 'bg-sky-900/40 border-sky-500 text-white shadow-lg shadow-sky-900/20'
                              : 'bg-gray-800/50 border-gray-700 hover:bg-sky-900/20 hover:border-sky-700'
                          }`}
                        >
                          <div className="flex items-center">
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                              answers[question.id] === letter.toUpperCase()
                                ? 'bg-sky-500 text-gray-900'
                                : 'bg-gray-700 text-gray-300'
                            }`}>
                              {letter.toUpperCase()}
                            </span>
                            <span>{value}</span>
                          </div>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              ))}
              <div className="text-center mt-10">
                <button
                  onClick={() => handleSubmit()}
                  className="bg-gradient-to-r from-sky-500 cursor-pointer text-white to-cyan-400 hover:from-sky-600 hover:to-cyan-500 px-8 py-3 rounded-xl font-bold text-lg shadow-lg shadow-sky-900/30 transition-all transform hover:scale-[1.02]"
                >
                  Soumettre mes réponses
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gray-900/50 rounded-2xl border border-sky-800/30">
              <p className="text-xl text-sky-300">Aucune question disponible pour ce test</p>
              <p className="text-gray-400 mt-2">Veuillez contacter votre instructeur</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestPart;
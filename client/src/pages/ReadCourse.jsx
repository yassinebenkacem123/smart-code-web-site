import React, { useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { MdDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import TestPart from '../components/TestPart';
import useStudentStore from '../store/useStudentStore';
import { BsStars } from "react-icons/bs";
import { SiTestcafe } from "react-icons/si";
import StudentCertificat from '../components/StudentCertificat';
import { jwtDecode } from 'jwt-decode';
const ReadCourse = () => {
  const { chaptersDetails,getQuestionsForTest, getChaptersDetails, resetTestState, loading, error } = useStudentStore();
  const location = useLocation();
  const courseId = location.state?.coursId || location.state?.courseId;
  const courseTitre = location.state?.courseTitre || "Titre du cours";
  
  const courseCompleted =  chaptersDetails?.every((chapter)=> chapter.status === 'termine');
  useEffect(() => {
    async function handle() {
      await getChaptersDetails(courseId);
    }
    handle();
  }, [getChaptersDetails, courseId]);

  const [chapitreId, setChapitreId] = React.useState(null);
  const chapitreContent = chaptersDetails.find(chap => chap.chapitre_id === chapitreId)?.contenu;
  const [chapterStatus, setChapterStatus] = React.useState(null);
  const [timeForTest, setTimeForTest] = React.useState(false);
  const [takeCertificat, setTakeCertificat] = React.useState(false);
  const token = localStorage.getItem('token');

  const certificatData = React.useMemo(() => ({
    courseName: courseTitre,
    studentName: jwtDecode(token)?.user_name || "no name exist"
  }), [courseTitre, token]);
  useEffect(() => {
    if (chaptersDetails.length > 0) {
      if (chapitreId == null) {
        // Set default only once after initial load
        setChapitreId(chaptersDetails[0].chapitre_id);
        setChapterStatus(chaptersDetails[0].status);
      } else {
        // Keep current selection; just sync its status from updated list
        const current = chaptersDetails.find(c => c.chapitre_id === chapitreId);
        if (current) setChapterStatus(current.status);
      }
    }
  }, [chaptersDetails, chapitreId]);

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <h1 className="text-2xl text-rose-500 font-semibold text-center">{error}</h1>
      </div>
    );
  }

  if (loading && !timeForTest) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <h1 className="text-2xl text-sky-500 font-semibold text-center">Chargement des données...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {takeCertificat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-3xl">
            <StudentCertificat certificatData={certificatData} />
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setTakeCertificat(false)}
                className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold shadow transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar */}
      <div className="hidden md:flex md:w-[30%] h-full border-r border-sky-800/50 p-4 overflow-y-auto flex-col">
        <h1 className="text-xl font-semibold text-sky-400 mb-4 tracking-wide">Liste des Chapitres</h1>
        <div className="flex flex-col gap-2">
          {chaptersDetails.map((chapitre, index) => (
            <div
              key={index}
              onClick={() => {
                if (chapitreId !== chapitre.chapitre_id) {
                  setChapterStatus(chapitre.status);
                  setChapitreId(chapitre.chapitre_id);
                  setTimeForTest(false);
                }

              }}
              className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition-all duration-200 border ${
                chapitreId === chapitre.chapitre_id
                  ? 'bg-sky-500 text-white border-sky-400 shadow-lg shadow-sky-900/30'
                  : 'bg-sky-900/60 hover:bg-sky-800/70 text-gray-200 border-sky-800'
              }`}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-800 border border-gray-600">
                {chapitre.status === 'termine' ? (
                  <MdDone className="text-green-400" />
                ) : (
                  <IoClose className="text-red-500" />
                )}
              </div>
              <span className="truncate">{chapitre.titre}</span>
            </div>
          ))}
          <button 
            disabled={courseCompleted !== true}
            className={`mt-2 border border-amber-400/60 justify-center bg-amber-400/20 hover:bg-amber-400/40 cursor-pointer flex items-center gap-2 py-2 px-3 rounded-md text-white transition ${courseCompleted !== true ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => { setTakeCertificat(true); }}
          >
            Prendre le Certificat
            <BsStars />
          </button>
          <button
            onClick={() => {
              window.history.back();
            }}
            className="mt-2 flex items-center gap-2 bg-gray-800/90 text-white px-3 py-2 font-medium text-base cursor-pointer rounded-md hover:bg-gray-700/90 transition"
          >
            <IoMdArrowRoundBack />
            Retourne
          </button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 md:w-[70%] w-full h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-sky-800/50 bg-gradient-to-r from-black via-black to-black/80">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent truncate">
              {courseTitre}
            </h2>
            <div className="flex md:hidden gap-2">
              <button
                onClick={() => { setTakeCertificat(true); }}
                disabled={courseCompleted !== true}
                className={`border border-amber-400/60 bg-amber-400/20 hover:bg-amber-400/40 text-white px-3 py-1.5 rounded-md text-sm ${courseCompleted !== true ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Certificat
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-800/90 hover:bg-gray-700/90 text-white px-3 py-1.5 rounded-md text-sm"
              >
                Retour
              </button>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-3 overflow-y-auto">
          {timeForTest ? (
            <TestPart getChaptersDetails={getChaptersDetails} chapitreId={chapitreId} />
          ) : (
            <>
              <div className="h-130 bg-sky-400/10 border border-sky-800/40 rounded-lg overflow-hidden shadow-md">
                <iframe
                  title="Chapitre Content"
                  srcDoc={chapitreContent || "<h1 style='color:white;text-align:center;'>Contenu indisponible</h1>"}
                  style={{ height: '100%', border: 'none', padding: '8px', width: '100%', backgroundColor: 'transparent', colorScheme: 'dark' }}
                  className="rounded-lg"
                />
              </div>
              <div className='w-full mt-4 px-4 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 justify-between'>
                <button
                  onClick={() => { 
                    setTimeForTest(true); 
                    resetTestState?.();
                    getQuestionsForTest(chapitreId);
                  }}
                  disabled={chapterStatus === 'termine'}
                  className={`bg-sky-500/25 border border-sky-400 text-white flex items-center justify-center gap-2 px-4 py-2.5 rounded-md hover:bg-sky-600/40 transition ${
                    chapterStatus === 'termine' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {chapterStatus === 'termine' ? 'Terminé' : 'Prêt pour passer un test'}
                  <SiTestcafe />
                </button>
                  <button 
                    disabled={courseCompleted !== true}
                    onClick={() => { setTakeCertificat(true); }}
                    className={`border bg-amber-400/20 hover:bg-amber-400/40 cursor-pointer flex items-center gap-2 border-amber-400/60 py-2 px-3 rounded-md text-white transition ${courseCompleted !== true ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Prendre le Certificat
                    <BsStars />
                  </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadCourse;

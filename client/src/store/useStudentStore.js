import {create} from 'zustand';
import { jwtDecode } from 'jwt-decode';
import {toast} from 'react-toastify';

const isTokenValid = (token) => {
  if (!token || typeof token !== 'string') {
    console.error('Invalid token format');
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp > currentTime; // Check if token is still valid
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

const useStudentStore = create((set)=>({
    courses: [],
    error:null,
    loading:false,
    course:null,
    enroll:false,
    enrolledCourses:[],
    questionsForTest:[],
    studentProfile:null,
    testResult:null,
    chaptersDetails:[],
  // Clear previous test data between chapters or retries
  resetTestState: () => set({ testResult: null, questionsForTest: [], error: null, loading: false }),
    // get the existing courses :
    getCourses : async ()=>{
        const token = localStorage.getItem('token');
        
        if(!token || !isTokenValid(token)){
            return set({error:'Token invalide ou expiré', loading:false});
        }
        set({loading:true, error:null});
        try{
            const res = await fetch("/api/cours",{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            if(!data.success){
               return  set({error:data.message, loading:false});
            }
            set({courses:data.cours, loading:false, error:null});

        }catch(err){
            console.error('Error fetching courses:', err);
            return set({error:'Erreur lors de la récupération des cours', loading:false});

        }
    },
    // get course with details :
    getCourseDetails: async (courseId)=>{
      const token = localStorage.getItem('token');
      if(!token || !isTokenValid(token)){
        return set({error: 'token invalide ou expiré', loading:false});
      }
      set({loading:true, error:null});
      try{
        const res = await fetch(`/api/etudiant/course/${courseId}`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if(!data.success){
          return set({error:data.message, loading:false});
        }
        set({
          course: data.cours,
          loading:false,
          error:null
        });
        
      }catch(err){
        console.error('Error fetching course details:', err);
        return set({error:'Erreur lors de la récupération des détails du cours', loading:false});
      }
    },
    buyCourse: async (courseId)=>{
      const token = localStorage.getItem('token');
      if(!token || !isTokenValid(token)){
        return set({error:'token invalide ou expiré', enroll:false}); 
      }
      set({enroll:true, error:null});
      try{
        const res = await fetch('/api/stripe/create-checkout-session',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({cours_id:courseId})
        });
        const data = await res.json();
        if(!data.url){
          return set({
            error:data.message || 'Erreur lors de la création de la session de paiement',
            enroll:false
          })
        }
        window.location.href = data.url;
      }catch(err){
        console.error('Error during course purchase:', err);
        set({
          error: 'Erreur lors de l\'achat du cours',
          enroll:false
        });

      }
    },
    // get enrolled courses :
    getEnrolledCourses: async ()=>{
      const token = localStorage.getItem('token');
      if(!token || !isTokenValid(token)){
        return set({
          error:'Token invalide ou expirée',
          loading:false
        })
      }
      set({
        error:null,  loading:true
      })
      try{
        const res = await fetch('/api/etudiant/enrolled-courses', {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if(!data.success){
          return set({
            error:data.message,
            loading:false
          })
        }
        return  set({
          error:null,
          loading:false,
          enrolledCourses:data.courses
        });

      }catch(err){
        console.error(err.message);
        return set({
          error:err.message,
          loading:false
        })
      }
    },
    // get student questions :
    getQuestionsForTest: async (chapitre_id)=>{
      const token = localStorage.getItem('token');
      if(!token || !isTokenValid(token)){
        return set({
          error:'Token invalide ou expiré',
          loading:false
        });
      }
      set({loading:true, error:null});
      try{
        const res = await fetch(`/api/questions/${chapitre_id}`, {
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}})
        const data = await res.json();
        if(!data.success){
          return set({
            error:data.message,
            loading:false
          });
        }
        set({
          questionsForTest:data.questions,
          loading:false,
          error:null
        })
      }catch(err){
        console.error('Error fetching questions for test:', err);
        return set({
          error:'Erreur lors de la récupération des questions pour le test',
          loading:false
        });
      }
    },
    submitAnswersForChapitre: async (chapitre_id, reponses)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      return set({
        error:'Token invalide ou expiré',
        loading:false
      });
    }
    try{
      const res =  await fetch(`/api/reponses/chapitre/${chapitre_id}`, {
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({reponses})
      })
        const data = await res.json();
        if(!data.success){
          console.error('Error submitting answers:', data.message);
          toast.error(data.message || 'Erreur lors de la soumission des réponses');
          return set({
            error:data.message,
            loading:false
          })
        }
        set({
          testResult:data,
          loading:false,
          error:null
        });
        return toast.success(`Test soumis avec succès`)

    }catch(err){
      console.error('Error submitting answers:', err);
      toast.error('Erreur lors de la soumission des réponses');
      return set({
        error:'Erreur lors de la soumission des réponses',
        loading:false
      });

    }
   },
   markChapterAsCompleted: async (chapitre_id)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      return set({
        error:'Token invalide ou expiré',
        loading:false
      });
    }
    set({
      loading:true,
      error:null})
    try{
      const res = await fetch(`/api/progression/chapitres/${chapitre_id}/terminer`,{
        method:'POST',
        headers:{
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if(!data.success){
        console.error('Error marking chapter as completed:', data.message);
        return set({
          error:data.message,
          loading:false
        });
      }
      set((state)=>({
        chaptersDetails: state.chaptersDetails.map(chap => 
          chap.chapitre_id === chapitre_id ? { ...chap, status: 'termine' } : chap
        ),
        loading:false,
        error:null
      }))
    }catch(err){
      console.error('Error marking chapter as completed:', err);
      return set({
        error:'Erreur lors de la validation du chapitre',
        loading:false
      });

    }
   },
   // get student profile:
   getStudentProfile: async ()=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      return set({
        error:'Token invalide ou expiré',
        loading:false
      });
    }
    set({loading:true, error:null});
    try{
      const res = await fetch('/api/etudiant/profile', {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if(!data.success){
        console.error('Error fetching student profile:', data.message);
        return set({
          error:data.message,
          loading:false
        });
      }
      set({
        studentProfile:data.profile,
        loading:false,
        error:null
      });

   }catch(err){
      console.error('Error fetching student profile:', err);
      return set({
        error:'Erreur lors de la récupération du profil étudiant',
        loading:false
      });
    }},
   // get chpater of specific cours with details:
   getChaptersDetails: async (coursId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      return set({
        error:'Token invalide ou expiré',
        loading:false
      });
    }
    set({loading:true, error:null});
    try{
      const res = await fetch(`/api/etudiant/chapter/${coursId}`, {
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if(!data.success){
        console.error('Error fetching chapter details:', data.message);
        return set({
          error:data.message,
          loading:false
        });
      }
      set({
        chaptersDetails:data.chapters,
        loading:false,
        error:null
      });

    }catch(err){
      console.error('Error fetching chapter details:', err);
      return set({
        error:'Erreur lors de la récupération des détails du chapitre',
        loading:false
      });
    }
   },
   // evoyer message a l'enseignant :
   sendMessage:async (enseignant_id, message)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      return set({
        error:'Token invalide ou expiré',
        loading:false
      });
    }
    set({loading:true, error:null});
    try{
      const res = await fetch('/api/messages',{
        method:'POST',
        headers:{
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body:JSON.stringify({
          enseignant_id, texte: message
        })
      })

      const data = await res.json();
      if(!data.success){
        console.error('Error sending message:', data.message);
        toast.error(data.message || 'Erreur lors de l\'envoi du message');
        return set({
          error:data.message,
          loading:false
        });
      }
      toast.success('Message envoyé avec succès');
      set({
        loading:false,
        error:null
      });
    }catch(err){
      console.error('Error sending message:', err);
      toast.error('Erreur lors de l\'envoi du message');
      return set({
        error:'Erreur lors de l\'envoi du message',
        loading:false
      });
    }
   }
  }
))

export default useStudentStore;
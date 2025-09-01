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
const useProfessorStore = create((set) => ({
  professorId: (() => {
    const token = localStorage.getItem('token');
    if (token && typeof token === 'string') {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken?.id || null;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  })(),
    professorStatistics:[],
    studentsMessages:[],
    loading:false,
    error:null,
    courses:[],
    editCours:false,
    course:null,
    professor:null,
    // setEdit course status:
    setEditCours: (status) => set({editCours: status}),
    // fetch professor statistics:
    fetchProfessorStatistics:async (professorId)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res = await fetch(`/api/enseignants/${professorId}/statistics`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                return;
            }
            set({professorStatistics:data.statistics});
            set({loading:false, error:null});

        }catch(err){
            console.error('Error fetching professor statistics:', err);
            set({error:'Failed to fetch statistics', loading:false});
        }
    }, 
    // fetch student messages:
    fetchStudentsMessages: async (professorId) => {
        const token = localStorage.getItem('token');
        if (!token || !isTokenValid(token)) {
            set({error: 'Token is invalid or expired', loading: false});
            return;
        }
        set({loading: true, error: null});
        try {
            const res = await fetch(`/api/enseignants/${professorId}/messages`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!data.success) {
                set({error: data.message, loading: false});
                return;
            }
            set({studentsMessages: data.messages});
            set({loading: false, error: null});
        } catch (err) {
            console.error('Error fetching student messages:', err);
            set({error: 'Failed to fetch messages', loading: false});
        }

    },
    // delete message by ID:
    deleteMessageById: async (messageId)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res = await fetch(`/api/enseignants/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
                return;
            }
            // Remove the deleted message from the studentsMessages array
            set((state) => ({
                studentsMessages: state.studentsMessages.filter(message => message.message_id !== messageId),
                loading: false,
                error: null
            }));
            toast.success('Message deleted successfully');
        }catch(err){
            console.error('Error deleting message:', err);
            set({error:'Failed to delete message', loading:false});
            toast.error('Failed to delete message');
        }
    },
    // fetch courses:
    fetchCoursesWithChapters: async ()=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res  = await fetch('/api/enseignants/cours-avec-chpitre', {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                return;
            }
            set({courses:data.data});
            set({loading:false, error:null});
        }catch(err){
            console.error('Error fetching courses with chapters:', err);
            set({error:'Failed to fetch courses', loading:false});
            return;
        }
    },
    // add cours :
    addCours:async (coursData)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const formData = new FormData();
            formData.append('titre', coursData.titre);
            formData.append('description', coursData.description);
            formData.append('prix', coursData.prix);
            formData.append('image_type', coursData.image_type);
            formData.append('image_url', coursData.image_url || '');
            if(coursData.image_type === 'upload' && coursData.imageFile)
            {
                formData.append('imageFile', coursData.imageFile);
            }
            const res = await fetch('/api/cours',{
                method:'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
            }
            toast.success('Course added successfully');
            set({loading:false, error:null});
            return data.coursId; // Return the ID of the newly created course

        }catch(err){
            console.error('Error adding course:', err);
            set({error:'Failed to add course', loading:false});
            toast.error('Failed to add course');
        }
    },
    // delete cours: 
    deleteCoursById: async (coursId)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return
        }
        const res = await fetch(`/api/cours/${coursId}`, {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data  = await res.json();
        if(!data.success){
            set({error:data.message, loading:false});
            toast.error(data.message);
            return;
        }
        set((state) => ({
            courses: state.courses.filter(course => course.id !== coursId)
        }));
        set({error:null, loading:false});
        toast.success('Course deleted successfully');
    },
    // fetch cours by id:
    fetchCoursById: async (coursId)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res = await fetch(`/api/cours/${coursId}`, {
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
                return;
            }
            set({course:data.cours, loading:false, error:null});
        }catch(err){
            console.error('Error fetching course by ID:', err);
            set({error:'Failed to fetch course', loading:false});
            return;
        }
    },
    // add chapters:
    addChapitres: async (chapitreData)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            toast.error('Token is invalid or expired');
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        try{
            set({error:null, loading:true})
            const res = await fetch('/api/chapitres',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(chapitreData)
            });
            const data = await res.json();
            if(!data.success){
                toast.error(data.message || "Erreur Lors de l'ajout");
                set({error:data.message,loading:false});
            }
            else{
                toast.success('Chapter added successfully');
                await useProfessorStore.getState().fetchCoursesWithChapters(); // Refresh courses with chapters
                
                set({loading:false, error:null});

            }
        }catch(err){
            console.error('Error adding chapter:', err);
            set({error:'Failed to add chapter', loading:false});
            toast.error('Failed to add chapter');
        }
        

    },
    // delete chapter by ID:
    deleteChaptre: async (chapitreId) => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !isTokenValid(token)) {
          set({ error: 'Token is invalid or expired', loading: false });
          return;
        }
        set({ loading: true, error: null });

        const res = await fetch(`/api/chapitres/${chapitreId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!data.success) {
          set({ error: data.message, loading: false });
          toast.error(data.message);
          return;
        }

        // Update the state with the new chapters
        set((state)=>({
            course: state.course ? {
                ...state.course,
                chapitres: state.course.chapitres.filter(chapitre => chapitre.id !== chapitreId)
            } : null,
            courses: state.courses.map(course => {
                if (course.chapitres) {
                    return {
                        ...course,
                        chapitres: course.chapitres.filter(chapitre => chapitre.id !== chapitreId)
                    };
                }
                return course;
            })
        }))
        toast.success('Chapitre supprimé avec succès');
        set({ loading: false, error: null });
      } catch (err) {
        console.error('Error deleting chapter:', err);
        set({ error: 'Failed to delete chapter', loading: false });
        toast.error('Failed to delete chapter');
      }
    },
    // delete all chapters of a course:
    deleteAllChaptres: async (coursId)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res = await fetch('/api/chapitres', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({cours_id: coursId})
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
                return;
            }
            // Remove all chapters from the specified course
            set((state)=>({
                course: state.course ? {
                    ...state.course,
                    chapitres: []
                } : null,
                courses: state.courses.map(course => {
                    if (course.id === coursId) {
                        return {
                            ...course,
                            chapitres: []
                        };
                    }
                    return course;
                })
            }))
            set({loading:false, error:null});
            toast.success('All chapters deleted successfully');
        }catch(err){
            console.error('Error deleting all chapters:', err);
            set({error:'Failed to delete all chapters', loading:false});
            toast.error('Failed to delete all chapters');
        }
    },
    // update chapter by ID:
    updateCours:async (coursId, updateData)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const formData = new FormData();
            formData.append('titre', updateData.titre);
            formData.append('description', updateData.description);
            formData.append('prix', updateData.prix);
            formData.append('image_type', updateData.image_type);
            formData.append('image_url', updateData.image_url || '');
            if(updateData.image_type === 'upload' && updateData.imageFile){
                formData.append('imageFile', updateData.imageFile);
            }
            const res = await fetch(`/api/cours/${coursId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                body: formData
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
                return;
            }
            // Update the course in the state
            set((state) => ({
                courses: state.courses.map(course => {
                    if(course.id === coursId){
                        return {
                            ...course,
                            titre: updateData.titre,
                            description: updateData.description,
                            prix: updateData.prix,
                            image_url: updateData.image_type === 'url' ? updateData.image_url : course.image_url, // Keep the old image if not updated
                            image_type: updateData.image_type
                        };
                    }
                    return course;
                })
            }));
            set({loading:false, error:null});
            toast.success('Course updated successfully');
        }catch(err){
            console.error('Error updating course:', err);
            toast.error('Failed to update course');
        }
    },
    // send message to students :
    sendMessage:async (messageData)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res = await fetch('/api/notifications',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(messageData)
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
                return;
            }else{
                toast.success('Message Envoyé Avec Succé');
                set({
                    error:null,
                    loading:false,
                });
            }
        }catch(err){
            set({
                error:err.message,
                loading:false
            })
            toast.error('Failed to send message');
            console.error(err.message);
        }
    },
    // add message :
    addQuestions:async (questions)=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        try{
            const res = await fetch('/api/questions',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(questions)
            });
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                toast.error(data.message);
                return;
            }
            toast.success('Questions added successfully');
            set({loading:false, error:null});
        }catch(err){
            console.error('Error adding questions:', err);
            set({error:'Failed to add questions', loading:false});
            toast.error('Failed to add questions');
        }

    },
    // get professor :
    getProfessorProfile: async ()=>{
        const token = localStorage.getItem('token');
        if(!token || !isTokenValid(token)){
            set({error:'Token is invalid or expired', loading:false});
            return;
        }
        set({loading:true, error:null});
        try{
            const res = await fetch('/api/enseignants',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json();
            if(!data.success){
                set({error:data.message, loading:false});
                return;
            }
            set({professor:data.professor, loading:false, error:null});

        }catch(err){
            set({error:'Failed to fetch professor profile '+err, loading:false});
            return;
        }
    }
}));
export default useProfessorStore;

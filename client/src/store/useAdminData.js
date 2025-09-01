import { create } from 'zustand';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp > currentTime; // Check if token is still valid
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

const useAdminStore = create((set) => ({
  stats: null,
  loading: false,
  error: null,
  profile: null,
  students:[],
  studentsLoading: false,
  studentsError: null,
  student:null,
  professors:[],
  professorsLoading: false,
  professorsError: null,
  admins:[],
  adminsLoading: false,
  adminsError: null,
  porfessor:null,
  admin: null,
  // fetching statistics :
  fetchStats: async () => {
    const token = localStorage.getItem('token');
    if (!token || !isTokenValid(token)) {
      set({ error: 'Unauthorized: Invalid or expired token', loading: false });
      return;
    }

    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/admin/statistics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          set({ error: 'Forbidden: You do not have access to this resource', loading: false });
          return;
        }
        throw new Error(`Failed to fetch stats: ${res.statusText}`);
      }

      const data = await res.json();
      set({ stats: data, loading: false });
    } catch (err) {
      console.error('Error fetching stats:', err);
      set({ error: err.message, loading: false });
    }
  },
  // fetching admin profile:
  fetchAdminProfile:async ()=>{
    const token = localStorage.getItem('token');
    if (!token || !isTokenValid(token)) {
      set({ error: 'Unauthorized: Invalid or expired token', loading: false });
      return;
    }

    const decoded = jwtDecode(token);
    const adminId = decoded.id;

    set({ loading: true, error: null });

    try {
      const res = await fetch(`/api/users/admins/${adminId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);
      const data = await res.json();
      set({ profile: data.user, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  // fetching students data:
  fetchStudents: async ()=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      set({studentsError: 'Unauthorized: Invalid or expired token', studentsLoading: false });
      return;
    }
    set({ studentsLoading: true, studentsError: null });
    try{
      const res = await fetch('/api/users/etudiants', {
        headers:{
          'Authorization': `Bearer ${token}`,
        }
      });
      if(!res.ok)return set({ studentsError: `Failed to fetch students: ${res.statusText}`, studentsLoading: false });
      const data = await res.json();
      set({ students: data, studentsLoading: false });

    }catch(err){
      console.error('Error fetching students:', err);
      set({ studentsError: err.message, studentsLoading: false });

    }
  },
  // add student:
  addStudent: async (studentData)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      set({studentsError: 'Unauthorized: Invalid or expired token', studentsLoading: false });
      return;
    }
    try{
      const res = await fetch('/api/users/etudiants',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(studentData),
      });
      const data = await res.json();

      if(!data.success) return set({ studentsError: `Failed to add student: ${data.message}`, studentsLoading: false });
      else{
        set((state)=>({
        students: [...state.students, data.user],
        studentsLoading: false,
      }));
      }
    
      return data;
    }catch(err){
      return set({ studentsError: err.message, studentsLoading: false });

    }
  },
  // delete student:
  deleteStudent: async (studentId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return set({studentsError: 'Unauthorized: Invalid or expired token', studentsLoading: false });
    }
    try{
      const res = await fetch('/api/users/etudiants/'+studentId,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await res.json();
      if(data.success){
        set((state) => ({
          students: state.students.filter(student => student.id !== studentId),
          studentsLoading: false,
        }));
        toast.success('Student deleted successfully');
      }else{
        toast.error(`Failed to delete student:`);
        return set({ studentsError: `Failed to delete student `, studentsLoading: false });
      }

    }catch(err){
      toast.error(`Error deleting student: ${err.message}`);
      return set({ studentsError: err.message, studentsLoading: false });

    }
  },
  // update Student:
  updateStudent: async (studentId, studentNewData)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return set({studentsError: 'Unauthorized: Invalid or expired token', studentsLoading: false });
    }
    try{
      set({ studentsLoading: true, studentsError: null });
      const res = await fetch('/api/users/etudiants/'+studentId,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(studentNewData),
      });
      const data = await res.json();
      if(!data.success) {
        toast.error(`Failed to update student: ${data.message}`);
        return set({ studentsError: `Failed to update student: ${data.message}`, studentsLoading: false });}
        else{
          set((state) => ({
            students: state.students.map(student => 
              student.id === studentId ? { ...student, ...studentNewData } : student
            ),
            studentsLoading: false,
          }));
          set({ student: data.user });
          toast.success('Student updated successfully');
          return data;
        }}catch(err){
          toast.error(`Error updating student: ${err.message}`);
          return set({ studentsError: err.message, studentsLoading: false });}
  },
  // get student by Id:
  getStudentById: async (studentId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return null
    }
    try{
      const res = await fetch(`/api/users/etudiants/${studentId}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if(data.success){
        set({student:data.user})
      }else{
        toast.error(data.message);
        return null;
      }
    }catch(err){
      toast.error(`Error fetching Student data: ${err.message}`);
      return null;
    }
  },
  // get student courses status:
  getStudentCoursesStats:async (studentId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return null;
    }
    try{
      const res = await fetch(`/api/users/etudiants/${studentId}/cours`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if(!res.ok) {
        toast.error(`Failed to fetch student courses: ${res.statusText}`);
        return null;
      }
      const data = await res.json();
      return data;
    }catch(err){
      toast.error(`Error fetching Student courses: ${err.message}`);
      console.error('Error fetching student courses:', err);
      return null;
    }
  },
  // fetching professors data:
  fetchProfessors: async ()=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      set({professorsError: 'Unauthorized: Invalid or expired token', professorsLoading: false });
      return;
    }
    set({ professorsLoading: true, professorsError: null });
    try{
      const res = await fetch('/api/users/enseignants', {
        headers:{
          'Authorization': `Bearer ${token}`,
        }
      });
      if(!res.ok)return set({ professorsError: `Failed to Professors: ${res.statusText}`, professorsLoading: false });
      const data = await res.json();
      set({ professors: data, professorsLoading: false });

    }catch(err){
      console.error('Error fetching students:', err);
      set({ professorsError: err.message, professorsLoading: false });

    }
  },
  // delete professor:
  deleteProfessor: async (professorId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return set({professorsError: 'Unauthorized: Invalid or expired token', professorsLoading: false });
    }
    try{
      const res = await fetch('/api/users/enseignants/'+professorId,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await res.json();
      if(data.success){
        set((state) => ({
          professors: state.professors.filter(professor => professor.id !== professorId),
          professorsLoading: false,
        }));
        toast.success('Professor deleted successfully');
      }else{
        toast.error(`Failed to delete professor:`);
        return set({ professorsError: `Failed to delete Professor `, professorsLoading: false });
      }

    }catch(err){
      toast.error(`Error deleting student: ${err.message}`);
      return set({ professorsError: err.message, professorsLoading: false });

    }
  },
  // add professor:
  addProfessor: async (professorData)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      set({professorsError: 'Unauthorized: Invalid or expired token', professorsLoading: false });
      return;
    }
    try{
      const res = await fetch('/api/users/enseignants',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(professorData),
      });
      const data = await res.json();

      if(!data.success) return set({ professorsError: `Failed to add professor: ${data.message}`, professorsLoading: false });
      else{
        set((state)=>({
        professors: [...state.professors, data.user],
        professorsLoading: false,
      }));
      }
    
      return data;
    }catch(err){
      return set({ professorsError: err.message, professorsLoading: false });

    }
  },
  // update Professor:
  updateProfessor: async (professorId, professorNewData)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return set({professorsError: 'Unauthorized: Invalid or expired token', professorsLoading: false });
    }
    try{
      set({ professorsLoading: true, professorsError: null });
      const res = await fetch('/api/users/enseignants/'+professorId,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(professorNewData),
      });
      const data = await res.json();
      if(!data.success) {
        toast.error(`Failed to update professor: ${data.message}`);
        return set({ professorsError: `Failed to update professor: ${data.message}`, professorsLoading: false });}
        else{
          set((state) => ({
            professors: state.professors.map(professor => 
              professor.id === professorId ? { ...professor, ...professorNewData } : professor
            ),
            professorsLoading: false,
          }));
          set({ professor: data.user });
          toast.success('Professor updated successfully');
          return data;
        }}catch(err){
          toast.error(`Error updating professor: ${err.message}`);
          return set({ professorsError: err.message, professorsLoading: false });}
  },
  // get professor by Id:
  getProfessorById: async (professorId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return null;
    }
    try{
      const res = await fetch(`/api/users/enseignants/${professorId}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
      });
      if(!res.ok) {
        toast.error(`Failed to fetch professor data: ${res.statusText}`);
        return null;
      }
      const data = await res.json();
      if(data.success){
        set({professor:data.user})}
      else{
        toast.error(data.message);
        return null;
      }
    }catch(err){
      toast.error(`Error fetching Professor data: ${err.message}`);
      return null;
    }
  },
  //get Professor Courses:
  getProfessorCourses: async (professorId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return null;
    }
    try{
      const res = await fetch(`/api/users/enseignants/${professorId}/cours`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if(!res.ok) {
        return null;
      }
      const data = await res.json();
      return data;
    }catch(err){
      toast.error(`Error fetching Professor courses: ${err.message}`);
      console.error('Error fetching professor courses:', err);
      return null;
    }
  },
  // get all admins:
  fetchAdmins: async ()=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      set({adminsError: 'Unauthorized: Invalid or expired token', adminsLoading: false });
      return;
    }
    set({ adminsLoading: true, adminsError: null });
    try{
      const res = await fetch('/api/users/admins', {
        headers:{
          'Authorization': `Bearer ${token}`,
        }
      });
      if(!res.ok)return set({ adminsError: `Failed to fetch admins: ${res.statusText}`, adminsLoading: false });
      const data = await res.json();
      set({ admins: data, adminsLoading: false });

    }catch(err){
      console.error('Error fetching admins:', err);
      set({ adminsError: err.message, adminsLoading: false });

    }
  },
  // delete admin:
  deleteAdmin: async (adminId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return set({adminsError: 'Unauthorized: Invalid or expired token', adminsLoading: false });
    }
    try{
      const res = await fetch('/api/users/admins/'+adminId,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      const data = await res.json();
      if(data.success){
        set((state) => ({
          admins: state.admins.filter(admin => admin.id !== adminId),
          adminsLoading: false,
        }));
        toast.success('Admin deleted successfully');
      }else{
        toast.error(`Failed to delete admin:`);
        return set({ adminsError: `Failed to delete Admin `, adminsLoading: false });
      }

    }catch(err){
      toast.error(`Error deleting admin: ${err.message}`);
      return set({ adminsError: err.message, adminsLoading: false });

    }
  },
  // add admin:
  addAdmin: async (adminData)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      set({adminsError: 'Unauthorized: Invalid or expired token', adminsLoading: false });
      return;
    }
    try{
      const res = await fetch('/api/users/admins',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(adminData),
      });
      const data = await res.json();
      if(!data.success) return set({ adminsError: `Failed to add admin: ${data.message}`, adminsLoading: false });
      else{
        set((state)=>({
        admins: [...state.admins, data.user],
        adminsLoading: false,
      }));
      }
      return data;
    }catch(err){
      return set({ adminsError: err.message, adminsLoading: false });

    }
  },
  // update Admin:
  updateAdmin: async (adminId, adminNewData)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return set({adminsError: 'Unauthorized: Invalid or expired token', adminsLoading: false });
    }
    try{
      set({ adminsLoading: true, adminsError: null });
      const res = await fetch('/api/users/admins/'+adminId,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json', 
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(adminNewData),
      });
      const data = await res.json();
      if(!data.success) {
        toast.error(`Failed to update admin: ${data.message}`);
        return set({ adminsError: `Failed to update admin: ${data.message}`, adminsLoading: false });}
        else{
          set((state) => ({
            admins: state.admins.map(admin => 
              admin.id === adminId ? { ...admin, ...adminNewData } : admin
            ),
            adminsLoading: false,
          }));
          set({ admin: data.user });
          toast.success('Admin updated successfully');
          return data;
        }}catch(err){
          toast.error(`Error updating admin: ${err.message}`);
          return set({ adminsError: err.message, adminsLoading: false });}
  },
  // get admin by Id:
  getAdminById: async (adminId)=>{
    const token = localStorage.getItem('token');
    if(!token || !isTokenValid(token)){
      toast.error('Unauthorized: Invalid or expired token');
      return null;
    }
    try{
      const res = await fetch(`/api/users/admins/${adminId}`,{
        headers:{
          'Authorization': `Bearer ${token}`,
        },
      });
      if(!res.ok) {
        toast.error(`Failed to fetch admin data: ${res.statusText}`);
        return null;
      }
      const data = await res.json();
      if(data.success){
        set({admin:data.user})}
      else{
        toast.error(data.message);
        return null;
      }
    }catch(err){
      toast.error(`Error fetching Admin data: ${err.message}`);
      return null;
    }
  },
}
));

export default useAdminStore;

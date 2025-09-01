import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  role: localStorage.getItem('role') || null,
  user: (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  })(),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  login: ({ token, role, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, role, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    set({ token: null, role: null, user: null, isAuthenticated: false });
  },


}));


export default useAuthStore;

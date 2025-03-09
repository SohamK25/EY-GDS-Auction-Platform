import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check", { withCredentials: true });
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      console.log("Auth check failed:", error.response?.data?.message);
      set({ authUser: null });
      localStorage.removeItem("authUser"); 
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data, { withCredentials: true });
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/signin", data, { withCredentials: true }); 
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true }); 
      set({ authUser: null });
      toast.success("Logged out successfully");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      toast.error("Logout failed");
    }
  }
}
),
{
  name: "auth-storage",
  getStorage: () => localStorage,
}
);

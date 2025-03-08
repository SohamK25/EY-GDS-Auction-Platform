import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuctionStore = create((set, get) => ({
  auctions: [],
  selectedAuction: null,
  isLoading: false,

  fetchAuctions: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('auct/auctions');
      set({ auctions: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch auctions');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAuctionItem: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`auct/auctions/${id}`);
      set({ selectedAuction: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch auction item');
    } finally {
      set({ isLoading: false });
    }
  },

  createAuction: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('auct/auction', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      set((state) => ({ auctions: [...state.auctions, res.data.item] }));
      toast.success('Auction created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create auction');
    } finally {
      set({ isLoading: false });
    }
  },

  placeBid: async (id, bidAmount) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`auct/bid/${id}`, { bid: bidAmount }, { withCredentials: true });
      set((state) => ({
        auctions: state.auctions.map((auction) =>
          auction._id === id ? { ...auction, ...res.data.item } : auction
        ),
      }));
      toast.success('Bid placed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place bid');
    } finally {
      set({ isLoading: false });
    }
  },

  editAuction: async (id, data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`auct/eauction/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      set((state) => ({
        auctions: state.auctions.map((auction) =>
          auction._id === id ? { ...auction, ...res.data.item } : auction
        ),
      }));
      toast.success('Auction updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update auction');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAuction: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`auct/dauction/${id}`, { withCredentials: true });
      set((state) => ({ auctions: state.auctions.filter((auction) => auction._id !== id) }));
      toast.success('Auction deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete auction');
    } finally {
      set({ isLoading: false });
    }
  },
}));

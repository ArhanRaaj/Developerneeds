import { create } from "zustand";

interface AppState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  sidebarOpen: boolean;
  preloaderDone: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setPreloaderDone: (done: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  selectedCategory: "all",
  sortBy: "newest",
  sidebarOpen: false,
  preloaderDone: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sort) => set({ sortBy: sort }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setPreloaderDone: (done) => set({ preloaderDone: done }),
}));

import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  selectedLocation: "India",
  setLocation: (location) => set({ selectedLocation: location }),
}));

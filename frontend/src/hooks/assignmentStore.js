import { create } from 'zustand';

export const useAssignmentStore = create((set) => ({
  ass: [],
  set_ass: (newCours) => set({ ass: newCours }),
}));
import { create } from 'zustand';

export const useSelectedCourseStore = create((set) => ({
  course_id: [],
  setCourse_id: (newCours) => set({ course_id: newCours }),
}));
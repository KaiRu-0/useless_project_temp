import { create } from 'zustand';

export const useCourseStore = create((set) => ({
  course: [],
  setCourse: (newCourses) => set({ course: newCourses }),
}));
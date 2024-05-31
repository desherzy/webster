import { create } from 'zustand';
import $api from "../axios.js";

const useProjectsStore = create((set) => ({
    projects: [],

    getProjects: async () => {
        try {
            const response = await $api.get('/projects/');
            set({ projects: response.data });
        } catch (error) {
            console.error('Error getting projects:', error);
        }
    },

    createProject: async (name, height, width) => {
        try {
            const response = await $api.post('/projects/', { name, height, width });
            set((state) => ({ projects: [...state.projects, response.data] }));
        } catch (error) {
            console.error('Error creating project:', error);
        }
    }

}));

export default useProjectsStore;

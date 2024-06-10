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
    },

    saveProject: async (contentJson, id) => {
        try {
            await $api.post(`/projects/save/${id}`, { contentJson });
        } catch (error) {
            console.error('Error saving project:', error);
        }
    },

    getProjectById: (id) => {
        const project = useProjectsStore.getState().projects.find((proj) => proj.id === id);
        return project;
    },

}));

export default useProjectsStore;

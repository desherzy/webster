import { create } from 'zustand';
import $api from '../axios';
import { devtools } from 'zustand/middleware';

const useAuthStore = create(devtools((set) => ({
    isAuthenticated: false,
    emailConfirmed: false,
    user: null,
    error: null,

    loginUser: async (userData) => {
        try {
            const response = await $api.post('/auth/login', userData);
            const { accessToken, refreshToken, user } = response.data;
            localStorage.setItem('token', accessToken);

            set((state) => ({
                user,
                isAuthenticated: true,
                emailConfirmed: user.emailConfirmed,
            }));
            return { user, accessToken, refreshToken };
        } catch (error) {
            console.error('Error logging in:', error);
            set({ isAuthenticated: false, user: null, error });
        }
    },
    registerUser: async (userData) => {
        try {
            const response = await $api.post('/auth/register', userData);
            const { accessToken, refreshToken, user } = response.data;
            localStorage.setItem('token', accessToken);

            set((state) => ({
                user,
                isAuthenticated: true,
                emailConfirmed: user.emailConfirmed,
            }));

            return { user, accessToken, refreshToken };
        } catch (error) {
            console.error('Error registering user:', error);
            set({ isAuthenticated: false, user: null, error });
        }
    },
    refreshUser: async () => {
        try {
            const response = await $api.get('/auth/refresh');
            const { user } = response.data;

            set((state) => ({
                user,
                isAuthenticated: true,
                emailConfirmed: user.emailConfirmed,
                error: null,
            }));
        } catch (error) {
            console.error('Error refreshing user:', error);
            set({ isAuthenticated: false, user: null, error });
        }
    },
    logoutUser: async () => {
        try {
            await $api.post('/auth/logout');
            localStorage.removeItem('token');

            set((state) => ({
                user: null,
                isAuthenticated: false,
                emailConfirmed: false,
                error: null,
            }));
        } catch (error) {
            console.error('Error logging out:', error);
            set({ isAuthenticated: false, user: null, error });
        }
    },

    uploadAvatar: async (file) => {
        try {
            const formData = new FormData();
            formData.append('photo', file);

            const response = await $api.patch('/users/avatar', formData);

            const { profileImage } = response.data;
            set((state) => ({
                ...state,
                user: {
                    ...state.user,
                    profileImage: profileImage,
                },
            }));

        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    },

    updateUser: async (updated) => {
        try {
            const response = await $api.patch('/users/update', { login: updated });

            const { login } = response.data;
            set((state) => ({
                ...state,
                user: {
                    ...state.user,
                    login: login,
                },
            }));

        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    },

    toogleNotifications: async (newValue) => {
        try {
            const response = await $api.post('/users/notification', { notifications: newValue });

            const { notifications } = response.data;
            set((state) => ({
                ...state,
                user: {
                    ...state.user,
                    notifications: notifications,
                },
            }));

        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    },
})));


export default useAuthStore;
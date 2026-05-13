import apiClient from './axiosInstance';

export const authRepository = {

    login: async (data: {
        username: string;
        password: string;
    }) => {

        const response = await apiClient.post(
            '/auth/login',
            data
        );

        return response.data;
    },

    register: async (data: {
        username: string;
        password: string;
    }) => {

        const response = await apiClient.post(
            '/auth/register',
            data
        );

        return response.data;
    }
};
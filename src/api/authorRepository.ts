import apiClient from './axiosInstance';
import type { Author } from '../types';

export const authorRepository = {
    getAll: async (): Promise<Author[]> => {
        const response = await apiClient.get<Author[]>('/authors');
        return response.data;
    },
    getById: async (id: number): Promise<Author> => {
        const response = await apiClient.get<Author>(`/authors/${id}`);
        return response.data;
    },
};
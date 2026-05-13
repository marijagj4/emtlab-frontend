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

    add: async (author: any): Promise<Author> => {
        const response = await apiClient.post<Author>('/authors', author);
        return response.data;
    },

    edit: async (id: number, author: any): Promise<Author> => {
        const response = await apiClient.put<Author>(`/authors/${id}`, author);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/authors/${id}`);
    }
};
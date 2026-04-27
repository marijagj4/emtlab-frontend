import apiClient from './axiosInstance';
import type { Book } from '../types';
export const bookRepository = {
    getAll: async (): Promise<Book[]> => {
        const response = await apiClient.get<Book[]>('/books');
        return response.data;
    },
    getById: async (id: number): Promise<Book> => {
        const response = await apiClient.get<Book>(`/books/${id}`);
        return response.data;
    },
};
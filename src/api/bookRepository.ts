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

    add: async (book: any): Promise<Book> => {
        const response = await apiClient.post<Book>('/books/add', book);
        return response.data;
    },

    edit: async (id: number, book: any): Promise<Book> => {
        const response = await apiClient.put<Book>(`/books/${id}/edit`, book);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/books/${id}/delete`);
    }
};
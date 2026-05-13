import apiClient from './axiosInstance';
import type { Country } from '../types';

export const countryRepository = {
    getAll: async (): Promise<Country[]> => {
        const response = await apiClient.get<Country[]>('/countries');
        return response.data;
    },

    getById: async (id: number): Promise<Country> => {
        const response = await apiClient.get<Country>(`/countries/${id}`);
        return response.data;
    },

    add: async (country: any): Promise<Country> => {
        const response = await apiClient.post<Country>('/countries/add', country);
        return response.data;
    },

    edit: async (id: number, country: any): Promise<Country> => {
        const response = await apiClient.put<Country>(`/countries/${id}/edit`, country);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/countries/${id}/delete`);
    }
};
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
};
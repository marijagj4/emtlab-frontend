import apiClient from './axiosInstance';

interface LoginRequest {
    username: string;
    password: string;
}

interface AuthResponse {
    token: string;
}

export const authRepository = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },
    register: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
        return response.data;
    },
};
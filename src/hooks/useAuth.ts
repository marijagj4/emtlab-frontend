import { useState } from 'react';
import { authRepository } from '../api/authRepository';

export const useAuth = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('accessToken')
    );

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {

        setLoading(true);
        setError(null);

        try {

            const response = await authRepository.login({
                username,
                password
            });

            localStorage.setItem('accessToken', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('username', username);

            setIsAuthenticated(true);

            return true;

        } catch {

            setError('Invalid username or password');

            return false;

        } finally {

            setLoading(false);

        }
    };

    const logout = () => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('username');

        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        loading,
        error,
        login,
        logout
    };
};
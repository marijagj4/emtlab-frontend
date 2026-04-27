import { useState, useEffect, useCallback } from 'react';
import type { Author } from '../types';
import { authorRepository } from '../api/authorRepository';

export const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAuthors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await authorRepository.getAll();
            setAuthors(data);
        } catch {
            setError('Failed to fetch authors');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAuthors();
    }, [fetchAuthors]);

    return { authors, loading, error, refetch: fetchAuthors };
};
import { useState, useEffect } from 'react';
import type { Author } from '../types';
import { authorRepository } from '../api/authorRepository';

export const useAuthors = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAuthors = async () => {
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
    };

    const addAuthor = async (author: any) => {
        await authorRepository.add(author);
        await fetchAuthors();
    };

    const editAuthor = async (id: number, author: any) => {
        await authorRepository.edit(id, author);
        await fetchAuthors();
    };

    const deleteAuthor = async (id: number) => {
        await authorRepository.delete(id);
        await fetchAuthors();
    };

    useEffect(() => {
        void fetchAuthors();
    }, []);

    return {
        authors,
        loading,
        error,
        refetch: fetchAuthors,
        addAuthor,
        editAuthor,
        deleteAuthor
    };
};
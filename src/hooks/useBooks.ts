import { useState, useEffect, useCallback } from 'react';
import type { Book } from '../types';
import { bookRepository } from '../api/bookRepository';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await bookRepository.getAll();
            setBooks(data);
        } catch {
            setError('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return { books, loading, error, refetch: fetchBooks };
};

export const useBook = (id: number) => {
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        bookRepository.getById(id)
            .then((data) => setBook(data))
            .catch(() => setError('Failed to fetch book'))
            .finally(() => setLoading(false));
    }, [id]);

    return { book, loading, error };
};
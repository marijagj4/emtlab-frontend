import { useState, useEffect } from 'react';
import type { Book } from '../types';
import { bookRepository } from '../api/bookRepository';

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBooks = async () => {
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
    };

    const addBook = async (book: any) => {
        await bookRepository.add(book);
        await fetchBooks();
    };

    const editBook = async (id: number, book: any) => {
        await bookRepository.edit(id, book);
        await fetchBooks();
    };

    const deleteBook = async (id: number) => {
        await bookRepository.delete(id);
        await fetchBooks();
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void fetchBooks();
    }, []);
    return {
        books,
        loading,
        error,
        refetch: fetchBooks,
        addBook,
        editBook,
        deleteBook
    };
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
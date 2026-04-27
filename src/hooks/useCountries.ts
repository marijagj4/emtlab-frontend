import { useState, useEffect, useCallback } from 'react';
import type { Country } from '../types';
import { countryRepository } from '../api/countryRepository';

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await countryRepository.getAll();
            setCountries(data);
        } catch {
            setError('Failed to fetch countries');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    return { countries, loading, error, refetch: fetchCountries };
};
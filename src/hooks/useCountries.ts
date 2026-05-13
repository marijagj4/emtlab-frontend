import { useState, useEffect } from 'react';
import type { Country } from '../types';
import { countryRepository } from '../api/countryRepository';

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = async () => {
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
    };

    const addCountry = async (country: any) => {
        await countryRepository.add(country);
        await fetchCountries();
    };

    const editCountry = async (id: number, country: any) => {
        await countryRepository.edit(id, country);
        await fetchCountries();
    };

    const deleteCountry = async (id: number) => {
        await countryRepository.delete(id);
        await fetchCountries();
    };

    useEffect(() => {
        void fetchCountries();
    }, []);

    return {
        countries,
        loading,
        error,
        refetch: fetchCountries,
        addCountry,
        editCountry,
        deleteCountry
    };
};
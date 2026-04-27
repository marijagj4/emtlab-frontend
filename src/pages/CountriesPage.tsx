import {
    Typography, Box, Card, CardContent,
    CircularProgress, Alert, Grid
} from '@mui/material';
import { useCountries } from '../hooks/useCountries';

const CountriesPage = () => {
    const { countries, loading, error } = useCountries();

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Countries</Typography>
            <Grid container spacing={3}>
                {countries.map((country) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={country.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">{country.name}</Typography>
                                <Typography color="text.secondary">
                                    {country.continent}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CountriesPage;
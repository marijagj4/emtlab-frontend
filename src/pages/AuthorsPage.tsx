import {
    Typography, Box, Card, CardContent,
    CircularProgress, Alert, Grid
} from '@mui/material';
import { useAuthors } from '../hooks/useAuthors';

const AuthorsPage = () => {
    const { authors, loading, error } = useAuthors();

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Authors</Typography>
            <Grid container spacing={3}>
                {authors.map((author) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={author.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    {author.name} {author.surname}
                                </Typography>
                                {author.country && (
                                    <Typography color="text.secondary">
                                        🌍 {author.country.name}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AuthorsPage;
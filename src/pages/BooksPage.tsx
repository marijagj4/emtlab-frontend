import {
    Typography, Box, Card, CardContent,
    CircularProgress, Alert, Chip, Grid
} from '@mui/material';
import { useBooks } from '../hooks/useBooks';

const BooksPage = () => {
    const { books, loading, error } = useBooks();

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Books</Typography>
            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6">{book.title}</Typography>
                                {book.author && (
                                    <Typography color="text.secondary">
                                        {book.author.name} {book.author.surname}
                                    </Typography>
                                )}
                                <Box sx={{ mt: 1 }}>
                                    {book.category && <Chip label={book.category} size="small" sx={{ mr: 1 }} />}
                                    <Chip
                                        label={`${book.availableCopies} available`}
                                        size="small"
                                        color={book.availableCopies > 0 ? 'success' : 'error'}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BooksPage;
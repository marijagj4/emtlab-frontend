import { useState } from 'react';
import {
    Typography, Box, Card, CardContent,
    CircularProgress, Alert, Chip, Grid,
    IconButton, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useBooks } from '../hooks/useBooks';
import type { Book } from '../types';

const BooksPage = () => {
    const { books, loading, error } = useBooks();
    const [isCardView, setIsCardView] = useState(true);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            {/* Header со Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">Books</Typography>
                <Box>
                    <IconButton onClick={() => setIsCardView(false)} color={!isCardView ? 'primary' : 'default'}>
                        <ViewListIcon />
                    </IconButton>
                    <IconButton onClick={() => setIsCardView(true)} color={isCardView ? 'primary' : 'default'}>
                        <ViewModuleIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Card View */}
            {isCardView ? (
                <Grid container spacing={3}>
                    {books.map((book) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                            <Card
                                sx={{ height: '100%', cursor: 'pointer' }}
                                onClick={() => setSelectedBook(book)}
                            >
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
            ) : (
                /* List View */
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Available</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow
                                    key={book.id}
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedBook(book)}
                                >
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author?.name} {book.author?.surname}</TableCell>
                                    <TableCell>{book.category}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={book.availableCopies}
                                            size="small"
                                            color={book.availableCopies > 0 ? 'success' : 'error'}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog — Детали за книга */}
            <Dialog open={!!selectedBook} onClose={() => setSelectedBook(null)} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedBook?.title}</DialogTitle>
                <DialogContent>
                    <Typography><strong>Author:</strong> {selectedBook?.author?.name} {selectedBook?.author?.surname}</Typography>
                    <Typography><strong>Category:</strong> {selectedBook?.category}</Typography>
                    <Typography><strong>Available copies:</strong> {selectedBook?.availableCopies}</Typography>
                    {selectedBook?.author?.country && (
                        <Typography><strong>Country:</strong> {selectedBook.author.country.name}</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedBook(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BooksPage;
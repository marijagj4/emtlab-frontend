import { useState } from 'react';
import {
    Typography, Box, Card, CardContent, CircularProgress, Alert,
    Chip, Grid, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import { useBooks } from '../hooks/useBooks';

const BooksPage = () => {
    const { books, loading, error, addBook, editBook, deleteBook } = useBooks();
    const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
    const [open, setOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        availableCopies: 0,
        authorId: ''
    });

    const handleOpenAdd = () => {
        setEditingBook(null);

        setFormData({
            title: '',
            category: '',
            availableCopies: 0,
            authorId: ''
        });

        setOpen(true);
    };

    const handleOpenEdit = (book: any) => {
        setEditingBook(book);

        setFormData({
            title: book.title || '',
            category: book.category || '',
            availableCopies: book.availableCopies || 0,
            authorId: book.author?.id || ''
        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingBook(null);
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const bookData = {
            name: formData.title,
            category: formData.category.toUpperCase(),
            authorId: Number(formData.authorId),
            state: 'GOOD',
            availableCopies: Number(formData.availableCopies)
        };

        if (editingBook) {
            await editBook(editingBook.id, bookData);
        } else {
            await addBook(bookData);
        }

        handleClose();
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Books
            </Typography>

            {isAdmin && (
                <Button variant="contained" sx={{ mb: 3 }} onClick={handleOpenAdd}>
                    Add Book
                </Button>
            )}

            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>

                                <Typography variant="h6">
                                    {book.title}
                                </Typography>

                                {book.author && (
                                    <Typography color="text.secondary">
                                        {book.author.name} {book.author.surname}
                                    </Typography>
                                )}

                                <Box sx={{ mt: 1 }}>
                                    {book.category && (
                                        <Chip
                                            label={book.category}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        />
                                    )}

                                    <Chip
                                        label={`${book.availableCopies} available`}
                                        size="small"
                                        color={
                                            book.availableCopies > 0
                                                ? 'success'
                                                : 'error'
                                        }
                                    />
                                </Box>

                                {isAdmin && (
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Edit />}
                                            onClick={() => handleOpenEdit(book)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<Delete />}
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                )}

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} fullWidth>

                <DialogTitle>
                    {editingBook ? 'Edit Book' : 'Add Book'}
                </DialogTitle>

                <DialogContent>

                    <TextField
                        margin="dense"
                        label="Title"
                        name="title"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="Category"
                        name="category"
                        fullWidth
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="Available Copies"
                        name="availableCopies"
                        type="number"
                        fullWidth
                        value={formData.availableCopies}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="Author ID"
                        name="authorId"
                        type="number"
                        fullWidth
                        value={formData.authorId}
                        onChange={handleChange}
                    />

                </DialogContent>

                <DialogActions>

                    <Button onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>

                </DialogActions>

            </Dialog>
        </Box>
    );
};

export default BooksPage;
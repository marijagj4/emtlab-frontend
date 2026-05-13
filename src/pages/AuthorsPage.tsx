import { useState } from 'react';
import {
    Typography, Box, Card, CardContent, CircularProgress, Alert,
    Grid, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import { useAuthors } from '../hooks/useAuthors';

const AuthorsPage = () => {
    const { authors, loading, error, addAuthor, editAuthor, deleteAuthor } = useAuthors();
    const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
    const [open, setOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        countryId: ''
    });

    const handleOpenAdd = () => {
        setEditingAuthor(null);
        setFormData({
            name: '',
            surname: '',
            countryId: ''
        });
        setOpen(true);
    };

    const handleOpenEdit = (author: any) => {
        setEditingAuthor(author);
        setFormData({
            name: author.name || '',
            surname: author.surname || '',
            countryId: author.country?.id || ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingAuthor(null);
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const authorData = {
            name: formData.name,
            surname: formData.surname,
            countryId: Number(formData.countryId)
        };

        if (editingAuthor) {
            await editAuthor(editingAuthor.id, authorData);
        } else {
            await addAuthor(authorData);
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
                Authors
            </Typography>

            {isAdmin && (
                <Button variant="contained" sx={{ mb: 3 }} onClick={handleOpenAdd}>
                    Add Author
                </Button>
            )}

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
                                        {author.country.name}
                                    </Typography>
                                )}

                                {isAdmin && (
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Edit />}
                                            onClick={() => handleOpenEdit(author)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<Delete />}
                                            onClick={() => deleteAuthor(author.id)}
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
                    {editingAuthor ? 'Edit Author' : 'Add Author'}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="Surname"
                        name="surname"
                        fullWidth
                        value={formData.surname}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="dense"
                        label="Country ID"
                        name="countryId"
                        type="number"
                        fullWidth
                        value={formData.countryId}
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

export default AuthorsPage;
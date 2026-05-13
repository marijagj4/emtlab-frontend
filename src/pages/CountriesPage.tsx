import { useState } from 'react';

import {
    Typography, Box, Card, CardContent,
    CircularProgress, Alert, Grid,
    Button, Dialog, DialogTitle,
    DialogContent, DialogActions,
    TextField
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';

import { useCountries } from '../hooks/useCountries';

const CountriesPage = () => {

    const {
        countries,
        loading,
        error,
        addCountry,
        editCountry,
        deleteCountry
    } = useCountries();
    const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
    const [open, setOpen] = useState(false);

    const [editingCountry, setEditingCountry] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '',
        continent: ''
    });

    const handleOpenAdd = () => {
        setEditingCountry(null);

        setFormData({
            name: '',
            continent: ''
        });

        setOpen(true);
    };

    const handleOpenEdit = (country: any) => {
        setEditingCountry(country);

        setFormData({
            name: country.name || '',
            continent: country.continent || ''
        });

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCountry(null);
    };

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        const countryData = {
            name: formData.name,
            continent: formData.continent
        };

        if (editingCountry) {
            await editCountry(editingCountry.id, countryData);
        } else {
            await addCountry(countryData);
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
                Countries
            </Typography>

            {isAdmin && (
                <Button variant="contained" sx={{ mb: 3 }} onClick={handleOpenAdd}>
                    Add Country
                </Button>
            )}

            <Grid container spacing={3}>

                {countries.map((country) => (

                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={country.id}>

                        <Card sx={{ height: '100%' }}>

                            <CardContent>

                                <Typography variant="h6">
                                    {country.name}
                                </Typography>

                                <Typography color="text.secondary">
                                    {country.continent}
                                </Typography>

                                {isAdmin && (
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Edit />}
                                            onClick={() => handleOpenEdit(country)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            startIcon={<Delete />}
                                            onClick={() => deleteCountry(country.id)}
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
                    {editingCountry ? 'Edit Country' : 'Add Country'}
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
                        label="Continent"
                        name="continent"
                        fullWidth
                        value={formData.continent}
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

export default CountriesPage;
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                mt: 8,
                p: 8,
                borderRadius: 6,
                background: '#f5ebe0',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                maxWidth: 800,
                mx: 'auto',
            }}
        >
            <Typography variant="h3" gutterBottom>
                Welcome to Book Rental 📚
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                Browse our collection of books, authors and countries
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.2,
                }}
                        component={Link} to="/books" size="large">
                    Browse Books
                </Button>
                <Button variant="outlined" component={Link} to="/authors" size="large">
                    View Authors
                </Button>
            </Box>
        </Box>
    );
};

export default HomePage;
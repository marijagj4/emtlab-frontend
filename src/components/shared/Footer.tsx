import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto', textAlign: 'center' }}>
            <Typography variant="body2">© 2026 Book Rental App</Typography>
        </Box>
    );
};

export default Footer;
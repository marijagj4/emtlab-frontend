import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';

const Layout = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header isAuthenticated={isAuthenticated} onLogout={logout} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
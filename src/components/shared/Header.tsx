import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    📚 Book Rental
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        Home
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/books"
                    >
                        Books
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/authors"
                    >
                        Authors
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/countries"
                    >
                        Countries
                    </Button>

                    {isAuthenticated ? (

                        <Button
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>

                    ) : (

                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                Login
                            </Button>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/register"
                            >
                                Register
                            </Button>
                        </>

                    )}

                </Box>

            </Toolbar>

        </AppBar>
    );
};

export default Header;
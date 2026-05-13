import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Paper
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { authRepository } from '../api/authRepository';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {

        setError(null);

        try {

            const { token, role } = await authRepository.register({
                username,
                password
            });

            localStorage.setItem('accessToken', token);
            localStorage.setItem('role', role);

            navigate('/books');

        } catch {

            setError('Registration failed');

        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 6
            }}
        >

            <Paper
                sx={{
                    p: 4,
                    width: 400
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Register
                </Typography>

                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>

            </Paper>

        </Box>
    );
};

export default RegisterPage;
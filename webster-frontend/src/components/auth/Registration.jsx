import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuthStore } from '../../store/index.js';
import {
    Alert,
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Paper,
} from '@mui/material';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });
    const { registerUser, error, isAuthenticated } = useAuthStore();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/projects', { replace: true });
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setErrors({ password: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' });
            return;
        }

        if (formData.password!== formData.repeatPassword) {
            setErrors({ repeatPassword: 'Passwords do not match.' });
            return;
        }

        try {
            await registerUser(formData);
            console.log('Logged in successfully!');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 10 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" sx={{ color: 'navy', fontWeight: 'bold' }}>
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            InputLabelProps={{ style: { color: '#333' } }}
                            InputProps={{ style: { color: '#333' } }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            InputLabelProps={{ style: { color: '#333' } }}
                            InputProps={{ style: { color: '#333' } }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputLabelProps={{ style: { color: '#333' } }}
                            InputProps={{ style: { color: '#333' } }}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repeatPassword"
                            label="Repeat Password"
                            type="password"
                            id="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            InputLabelProps={{ style: { color: '#333' } }}
                            InputProps={{ style: { color: '#333' } }}
                            error={!!errors.repeatPassword}
                            helperText={errors.repeatPassword}
                        />
                        {error && (
                            <Alert severity="error" sx={{ width: '100%', mt: 2, borderRadius: 10 }}>
                                Error registering. Please try again.
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: 2,
                                backgroundColor: 'navy',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#1e3c72',
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2" sx={{ color: 'grey' }}>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                sx={{
                                    color: 'navy',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Registration;

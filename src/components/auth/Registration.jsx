import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/index.js";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({  username: '',  email: '', password: '', repeatPassword: '' });
    const { registerUser, error, isAuthenticated } = useAuthStore();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/projects", {replace: true});
        }
    }, [isAuthenticated]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setErrors({ password: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'});
            return;
        }

        if (formData.password !== formData.repeatPassword) {
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
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                    Register
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
                        value={formData.firstName}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
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
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
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
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
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
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        error={!!errors.repeatPassword}
                        helperText={errors.repeatPassword}
                    />
                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                            Error registering. Please try again.
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Registration;
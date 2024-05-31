import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/index.js";
import {Alert, Box, Button, Container, TextField, Typography} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loginUser, isAuthenticated, error } = useAuthStore();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/projects", {replace: true});
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (loginSuccess) {
            navigate('/projects');
        }
    }, [loginSuccess, navigate]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData);
            setLoginSuccess(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setShowAlert(true);
        }};



    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' }}>
                <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    />
                    {showAlert && (
                        <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                            Error logging in. Please try again.
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import {
    Box,
    Typography,
    Button
} from '@mui/material';

const photos = [
    { url: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=600' },
    { url: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?q=80&w=600' },
    { url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=600' },
];

const MainPage = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row', // Changed to row to position boxes side by side
                gap: 7, // Reduced gap between boxes
                padding: 5, // Padding to give some space from the edges
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(9,38,64, 0.5)',
                    textAlign: 'center',
                    borderRadius: 5,
                    padding: 3,
                    width: '40%', // Width for the text box
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    style={{
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        marginBottom: 20,
                    }}
                >
                    Hello! I'm webster
                </Typography>
                <Typography
                    variant="body1"
                    component="p"
                    gutterBottom
                    style={{
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Welcome to our online photo editing and content creation service! Here you will find powerful tools for professional image processing and creating captivating visual materials, all accessible directly in your browser. Create unique masterpieces easily and quickly with us!
                </Typography>
                <Link to="/projects" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{
                            backgroundColor: '#333',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: 5,
                            marginBottom: 20, // Add margin-bottom for spacing after the button
                        }}
                    >
                        Get started
                    </Button>
                </Link>
            </Box>

            <Box sx={{ width: '40%' }}> {/* Width for the carousel box */}
                <Carousel>
                    {photos.map((photo, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={photo.url}
                            sx={{
                                width: '100%',
                                borderRadius: 5,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            }}
                        />
                    ))}
                </Carousel>
            </Box>
        </Box>
    );
};

export default MainPage;

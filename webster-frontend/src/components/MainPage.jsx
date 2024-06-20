import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography, Button } from '@mui/material';

const photos = [
    { url: '/workspace1.png' },
    { url: '/workspace2.png' },
    { url: '/workspace3.png' },
];

const MainPage = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100vh',

                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 7,
                padding: 5,
                overflow: 'hidden',
                '::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5) blur(7px)',
                    zIndex: -1,
                },
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
                            marginBottom: 20,
                        }}
                    >
                        Get started
                    </Button>
                </Link>
            </Box>

            <Box sx={{ width: '45%' }}>
                <Carousel>
                    {photos.map((photo, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={photo.url}
                            sx={{
                                width: '100%',
                                maxHeight: '900px',
                                borderRadius: 5,
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                objectFit: 'contain',
                            }}
                        />
                    ))}
                </Carousel>
            </Box>
        </Box>
    );
};

export default MainPage;
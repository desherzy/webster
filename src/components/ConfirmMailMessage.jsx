import React from 'react';
import {Box} from "@mui/material";

const ConfirmMailMessage = () => {
    return (
        <div style={{
            backgroundSize: 'cover',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            filter: 'blur(0px)',
        }} display="flex">

            <Box
                bg="#E2E8F0"
                p={4}
                color="white"
                textAlign="center"
                borderRadius="md"
            >
                We have sent you a message on your email address. Please confirm your email address to finish registration!
            </Box>
        </div>
    );
};

export default ConfirmMailMessage;
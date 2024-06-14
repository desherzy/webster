import React, { useState } from 'react';
import { Modal, Box, Button, Typography, TextField, Select, MenuItem } from '@mui/material';

const ExportModal = ({ open, onClose, onExport }) => {
    const [fileName, setFileName] = useState('canvas');
    const [format, setFormat] = useState('png');
    const [quality, setQuality] = useState(1.0);

    const handleExport = () => {
        onExport({ fileName, format, quality });
        onClose();
    };

    return (
        <Modal sx={{width: "40vw", margin: "auto"}} open={open} onClose={onClose}>
            <Box
                display="flex"
                flexDirection="column"
                p={4}
                bgcolor="white"
                mx="auto"
                mt={10}
                borderRadius={2}
                boxShadow={24}
            >
                <Box>
                    <h1 className="text-black">Export settings</h1>
                </Box>
                <Typography variant="h6" mb={2}>Export Canvas</Typography>
                <TextField
                    label="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="jpeg">JPEG</MenuItem>
                    <MenuItem value="json">JSON</MenuItem>
                    <MenuItem value="json">PDF</MenuItem>
                    <MenuItem value="svg">SVG</MenuItem>
                </Select>
                {format === 'jpeg' && (
                    <TextField
                        label="Quality (0 to 1)"
                        type="number"
                        inputProps={{ min: 0, max: 1, step: 0.1 }}
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                )}
                <Button variant="contained" color="primary" onClick={handleExport} sx={{ mt: 2 }}>
                    Export
                </Button>
            </Box>
        </Modal>
    );
};

export default ExportModal;
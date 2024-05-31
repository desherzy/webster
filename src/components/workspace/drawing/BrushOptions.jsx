import React from 'react';
import {useCanvasStore} from "../../../store/index.js";
import {Box, Chip, Slider, Typography} from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';

const BrushOptions = () => {
    const { color, setColor, brushSize, setBrushSize } = useCanvasStore();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={2} color="white">
            <Box display="flex" alignItems="center" mb={2}>
                <ColorLensIcon sx={{ mr: 1, color: 'white' }} />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ marginLeft: '8px' }}
                />
            </Box>
            <Box width="100%">
                <Chip label="Brush size" color="primary" variant="outlined" />
                <Slider
                    min={1}
                    max={50}
                    value={brushSize}
                    onChange={(e, value) => setBrushSize(value)}
                    aria-labelledby="brush-size-slider"
                    sx={{ color: 'white' }}
                />
            </Box>
        </Box>
    );
};

export default BrushOptions;
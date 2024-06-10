import React from 'react';
import {Box, Typography, Select, MenuItem, IconButton, Chip} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import {useCanvasStore} from "../../../store/index.js";
import EraserIcon from '@mui/icons-material/AutoFixOff';

const BrushSelect = () => {
    const { setIsDrawingMode, setBrushType, setColor } = useCanvasStore();

    const activateEraser = () => {
        setIsDrawingMode(true);
        setColor('white');
    };



    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={2} color="white">
            <Box display="flex" alignItems="center" mb={2}>

                <Chip label="Brush type" color="primary" variant="outlined" />
                <Select
                    defaultValue="PencilBrush"
                    onChange={(e) => setBrushType(e.target.value)}
                    sx={{ ml: 1, minWidth: 120, color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
                >
                    <MenuItem value="PencilBrush">Pencil</MenuItem>
                    <MenuItem value="CircleBrush">Circle</MenuItem>
                    <MenuItem value="SprayBrush">Spray</MenuItem>
                </Select>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%">
                <IconButton onClick={() => setIsDrawingMode(true)}>
                    <BrushIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={() => setIsDrawingMode(false)}>
                    <SelectAllIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={activateEraser}>
                    <EraserIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default BrushSelect;
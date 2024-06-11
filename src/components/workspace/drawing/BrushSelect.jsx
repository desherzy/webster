import React from 'react';
import {Box, Typography, Select, MenuItem, IconButton, Chip, Tooltip} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import {useCanvasStore, useProjectsStore} from "../../../store/index.js";
import EraserIcon from '@mui/icons-material/AutoFixOff';
import SaveIcon from "@mui/icons-material/Save.js";
import {useParams} from "react-router-dom";

const BrushSelect = () => {
    const { setIsDrawingMode, setBrushType, setColor, canvas } = useCanvasStore();
    const { saveProject } = useProjectsStore();
    const activateEraser = () => {
        setIsDrawingMode(true);
        setColor('white');
    };
    const { id } = useParams();

    const handleSave = async () => {
        if (canvas) {
            const contentJson = JSON.stringify(canvas.toJSON());
            await saveProject(contentJson, id);
        }
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
                <Tooltip title="Draw">
                    <IconButton onClick={() => setIsDrawingMode(true)}>
                        <BrushIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Select mode">
                    <IconButton onClick={() => setIsDrawingMode(false)}>
                        <SelectAllIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eraser">
                    <IconButton onClick={activateEraser}>
                        <EraserIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                    <IconButton onClick={handleSave}>
                        <SaveIcon sx={{color: 'white'}}/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default BrushSelect;
import React from 'react';
import { useCanvasStore } from "../../../store/index.js";
import { Box, IconButton, TextField } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const ShapesSelect = () => {
    const { canvas, color, brushSize } = useCanvasStore();
    const [fillColor, setFillColor] = React.useState('#ffffff');

    const handleFillColorChange = (event) => {
        setFillColor(event.target.value);
    };

    const addShape = (shape) => {
        if (!canvas) return;

        let shapeObject;
        switch (shape) {
            case 'Circle':
                shapeObject = new fabric.Circle({
                    radius: 90,
                    fill: fillColor,
                    stroke: color,
                    strokeWidth: brushSize,
                    selectable: true
                });
                break;
            case 'Square':
                shapeObject = new fabric.Rect({
                    width: 100,
                    height: 100,
                    fill: fillColor,
                    stroke: color,
                    strokeWidth: brushSize,
                    selectable: true
                });
                break;
            case 'Triangle':
                shapeObject = new fabric.Triangle({
                    width: 100,
                    height: 100,
                    fill: fillColor,
                    stroke: color,
                    strokeWidth: brushSize,
                    selectable: true
                });
                break;
            case 'Line':
                shapeObject = new fabric.Line([50, 100, 200, 200], {
                    stroke: color,
                    strokeWidth: brushSize,
                    selectable: true
                });
                break;
            default:
                break;
        }

        if (shapeObject) {
            canvas.add(shapeObject);
            canvas.renderAll();
        }
    };

    return (
        <Box className="p-4" color="white">
            <TextField
                label="Fill Color"
                type="color"
                value={fillColor}
                onChange={handleFillColorChange}
                fullWidth
                sx={{ mt: 2, mb: 2, label: { color: 'white' }, input: { color: 'white' } }}
            />
            <Box display="flex" justifyContent="space-around">
                <IconButton onClick={() => addShape('Circle')} sx={{ color: 'white', fontSize: 40 }}>
                    <CircleIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton onClick={() => addShape('Square')} sx={{ color: 'white', fontSize: 40 }}>
                    <SquareIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton onClick={() => addShape('Triangle')} sx={{ color: 'white', fontSize: 40 }}>
                    <ChangeHistoryIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton onClick={() => addShape('Line')} sx={{ color: 'white', fontSize: 40 }}>
                    <HorizontalRuleIcon sx={{ fontSize: 30 }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ShapesSelect;

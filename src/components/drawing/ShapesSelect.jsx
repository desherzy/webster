import React from 'react';
import {useCanvasStore} from "../../store/index.js";
import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material';

const ShapesSelect = () => {
    const { canvas, color, brushSize, setColor, setBrushSize } = useCanvasStore();
    const [shape, setShape] = React.useState('Circle');
    const [fillColor, setFillColor] = React.useState('#ffffff');

    const handleShapeChange = (event) => {
        setShape(event.target.value);
    };

    const handleFillColorChange = (event) => {
        setFillColor(event.target.value);
    };

    const addShape = () => {
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
                    width: 30,
                    height: 30,
                    fill: fillColor,
                    stroke: color,
                    strokeWidth: brushSize,
                    left: 100,
                    top: 100,
                    selectable: true
                });
                break;
            case 'Triangle':
                shapeObject = new fabric.Triangle({
                    width: 30,
                    height: 30,
                    fill: fillColor,
                    stroke: color,
                    strokeWidth: brushSize,
                    left: 100,
                    top: 100,
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
        <div className="p-4">
            <FormControl fullWidth>
                <InputLabel id="shape-select-label">Shape</InputLabel>
                <Select
                    labelId="shape-select-label"
                    value={shape}
                    label="Shape"
                    onChange={handleShapeChange}
                >
                    <MenuItem value="Circle">Circle</MenuItem>
                    <MenuItem value="Square">Square</MenuItem>
                    <MenuItem value="Triangle">Triangle</MenuItem>
                    <MenuItem value="Line">Line</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Fill Color"
                type="color"
                value={fillColor}
                onChange={handleFillColorChange}
                fullWidth
                sx={{ mt: 2 }}
            />
            <Button variant="contained" onClick={addShape} sx={{ mt: 2 }}>
                Add Shape
            </Button>
        </div>
    );
};

export default ShapesSelect;
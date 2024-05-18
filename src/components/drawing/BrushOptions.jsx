import React from 'react';
import {useCanvasStore} from "../../store/index.js";

const BrushOptions = () => {
    const { color, setColor, brushSize, setBrushSize } = useCanvasStore();

    return (
        <div>
            <label>Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
            <label>Brush Size: </label>
            <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(e.target.value)}
            />
        </div>
    );
};

export default BrushOptions;
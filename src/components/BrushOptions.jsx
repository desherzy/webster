import React from 'react';

const BrushOptions = ({ color, setColor, brushSize, setBrushSize }) => {
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
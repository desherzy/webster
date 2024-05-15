import React from 'react';

const ToolBar = ({ setBrushType, setIsDrawingMode }) => {
    return (
        <div>
            <label>Brush Type: </label>
            <select onChange={(e) => setBrushType(e.target.value)}>
                <option value="PencilBrush">Pencil</option>
                <option value="CircleBrush">Circle</option>
                <option value="SprayBrush">Spray</option>

            </select>
            <button onClick={() => setIsDrawingMode(true)}>Draw</button>
            <button onClick={() => setIsDrawingMode(false)}>Select</button>
        </div>
    );
};

export default ToolBar;
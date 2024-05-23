import React from 'react';
import BrushOptions from './drawing/BrushOptions.jsx';
import BrushSelect from './drawing/BrushSelect.jsx';
import { Button } from '@mui/material';
import ShapesSelect from "./drawing/ShapesSelect.jsx";
import ImageUploader from "./image/ImageUploader.jsx";


const LeftToolbar = ({ clearCanvas, onImageUpload }) => {
    return (
        <div className=" flex flex-col justify-between h-screen bg-gray-800 p-4">
            <div>
                <BrushOptions/>
                <BrushSelect/>
                <ShapesSelect/>
                <ImageUploader onImageUpload={onImageUpload} />
                <Button variant="contained" onClick={clearCanvas} sx={{ mt: 2 }}>Clear</Button>
            </div>
            <div className="flex-grow" />
        </div>
    );
};

export default LeftToolbar;
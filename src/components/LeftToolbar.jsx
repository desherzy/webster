import React from 'react';
import BrushOptions from './drawing/BrushOptions.jsx';
import BrushSelect from './drawing/BrushSelect.jsx';
import { Button } from '@mui/material';
import ShapesSelect from "./drawing/ShapesSelect.jsx";
import ImageUploader from "./image/ImageUploader.jsx";
import {useCanvasStore} from "../store/index.js";


const LeftToolbar = ({ clearCanvas, onImageUpload, undo, redo }) => {

    return (
        <div className=" flex flex-col justify-between h-screen bg-gray-800 p-4">
            <div>
                <BrushOptions/>
                <BrushSelect/>
                <ShapesSelect/>
                <ImageUploader onImageUpload={onImageUpload} />
                <Button variant="contained" onClick={clearCanvas} sx={{ mt: 2 }}>Clear</Button>
                <Button variant="contained" color="primary" onClick={undo} fullWidth className="mt-4">
                    Undo
                </Button>
                <Button variant="contained" color="primary" onClick={redo} fullWidth className="mt-4">
                    Redo
                </Button>
            </div>
            <div className="flex-grow" />
        </div>
    );
};

export default LeftToolbar;
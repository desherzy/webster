import React, {useState} from 'react';
import BrushOptions from '../drawing/BrushOptions.jsx';
import BrushSelect from '../drawing/BrushSelect.jsx';
import { Button } from '@mui/material';
import ShapesSelect from "../drawing/ShapesSelect.jsx";
import ImageUploader from "../image/ImageUploader.jsx";
import {useCanvasStore} from "../../../store/index.js";
import ExportModal from "../image/ExportModal.jsx";


const LeftToolbar = ({ clearCanvas, onImageUpload, undo, redo, onExport }) => {
    const [isExportModalOpen, setExportModalOpen] = useState(false);

    const openExportModal = () => setExportModalOpen(true);
    const closeExportModal = () => setExportModalOpen(false);

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
                <Button variant="contained" color="primary" onClick={openExportModal} fullWidth className="mt-4">
                    Export
                </Button>
                <ExportModal
                    open={isExportModalOpen}
                    onClose={closeExportModal}
                    onExport={onExport}
                />
            </div>
            <div className="flex-grow" />
        </div>
    );
};

export default LeftToolbar;
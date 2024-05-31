import React, {useState} from 'react';
import BrushOptions from '../drawing/BrushOptions.jsx';
import BrushSelect from '../drawing/BrushSelect.jsx';
import { IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShapesSelect from "../drawing/ShapesSelect.jsx";
import ImageUploader from "../image/ImageUploader.jsx";
import ExportModal from "../image/ExportModal.jsx";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const LeftToolbar = ({ clearCanvas, onImageUpload, undo, redo, onExport }) => {
    const [isExportModalOpen, setExportModalOpen] = useState(false);

    const openExportModal = () => setExportModalOpen(true);
    const closeExportModal = () => setExportModalOpen(false);

    return (
        <div className="flex flex-col justify-between h-screen bg-gray-800 p-1">
            <div>
                <div className="flex items-center justify-between bg-gray-600 rounded-3xl mt-2 mb-2">
                    <IconButton onClick={clearCanvas} color="secondary">
                        <DeleteForeverIcon sx={{ color: 'white', fontSize: 30 }} />
                    </IconButton>
                    <IconButton onClick={undo} color="primary" >
                        <UndoIcon sx={{ color: 'white', fontSize: 30 }} />
                    </IconButton>
                    <IconButton onClick={redo} color="primary" >
                        <RedoIcon sx={{ color: 'white', fontSize: 30 }} />
                    </IconButton>
                    <IconButton onClick={openExportModal} color="primary">
                        <SaveAltIcon sx={{ color: 'white', fontSize: 30 }} />
                    </IconButton>
                </div>

                <ExportModal
                    open={isExportModalOpen}
                    onClose={closeExportModal}
                    onExport={onExport}
                />
                <BrushOptions/>
                <BrushSelect/>
                <ShapesSelect/>
                <ImageUploader onImageUpload={onImageUpload}/>

            </div>
            <div className="flex-grow"/>
        </div>
    );
};

export default LeftToolbar;
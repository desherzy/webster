import React, {useEffect, useState} from 'react';
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
import {useCanvasStore, useProjectsStore} from "../../../store/index.js";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PanToolIcon from '@mui/icons-material/PanTool';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import SaveIcon from '@mui/icons-material/Save';
import {useParams} from "react-router-dom";

const LeftToolbar = ({ clearCanvas, onImageUpload, undo, redo, onExport }) => {
    const [isExportModalOpen, setExportModalOpen] = useState(false);
    const { canvas, color} = useCanvasStore();
    const { saveProject } = useProjectsStore();
    const [isPanning, setIsPanning] = useState(false);
    const [zoomFactor, setZoomFactor] = useState(1);
    const [zoomMode, setZoomMode] = useState(false);
    const { id } = useParams();
    const openExportModal = () => setExportModalOpen(true);
    const closeExportModal = () => setExportModalOpen(false);

    const fillCanvasBackground = () => {
        if (canvas) {
            canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
        }
    };

    const handleSave = async () => {
        if (canvas) {
            const contentJson = JSON.stringify(canvas.toJSON());
            await saveProject(contentJson, id);
        }
    };

    useEffect(() => {
        if (!canvas) return;

        const handleCanvasWheel = (event) => {
            if (zoomMode) {
                event.preventDefault();
                if (event.deltaY < 0) {
                    zoom('in');
                } else if (event.deltaY > 0) {
                    zoom('out');
                }
            }
        };

        const canvasElement = canvas.upperCanvasEl;

        canvasElement.addEventListener('wheel', handleCanvasWheel);

        return () => {
            canvasElement.removeEventListener('wheel', handleCanvasWheel);
        };
    }, [canvas, zoomMode]);

    const zoom = (type) => {
        if (!canvas) return;

        let newZoomFactor = canvas.getZoom();
        if (type === 'in') {
            newZoomFactor += 0.1;
        } else if (type === 'out') {
            newZoomFactor -= 0.1;
        }

        setZoomFactor(newZoomFactor);
        canvas.setZoom(newZoomFactor);
    };

    const toggleZoomMode = () => {
        setZoomMode((prev) => !prev);
    };

    const addText = () => {
        if (!canvas) return;

        const text = new fabric.IText('Enter your text here', {
            left: 100,
            top: 100,
            fill: color,
            fontSize: 20,
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    };

    const togglePanning = () => {
        if (!canvas) return;

        setIsPanning((prev) => !prev);
    };

    useEffect(() => {
        if (!canvas) return;

        if (isPanning) {
            canvas.isDrawingMode = false;
            canvas.selection = false;
            canvas.forEachObject((obj) => {
                obj.selectable = false;
            });
            canvas.on('mouse:down', onMouseDown);
            canvas.on('mouse:move', onMouseMove);
            canvas.on('mouse:up', onMouseUp);
        } else {
            canvas.off('mouse:down', onMouseDown);
            canvas.off('mouse:move', onMouseMove);
            canvas.off('mouse:up', onMouseUp);
            canvas.selection = true;
            canvas.forEachObject((obj) => {
                obj.selectable = true;
            });
        }

        return () => {
            canvas.off('mouse:down', onMouseDown);
            canvas.off('mouse:move', onMouseMove);
            canvas.off('mouse:up', onMouseUp);
        };
    }, [isPanning, canvas]);

    const onMouseDown = (event) => {
        canvas.isDragging = true;
        canvas.lastPosX = event.e.clientX;
        canvas.lastPosY = event.e.clientY;
    };

    const onMouseMove = (event) => {
        if (canvas.isDragging) {
            const e = event.e;
            const vpt = canvas.viewportTransform;
            vpt[4] += e.clientX - canvas.lastPosX;
            vpt[5] += e.clientY - canvas.lastPosY;
            canvas.requestRenderAll();
            canvas.lastPosX = e.clientX;
            canvas.lastPosY = e.clientY;
        }
    };

    const onMouseUp = () => {
        canvas.isDragging = false;
        canvas.selection = true;
    };

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
                <IconButton onClick={fillCanvasBackground} color="primary" sx={{ mt: 2 }}>
                    <FormatColorFillIcon sx={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={addText} sx={{ color: 'white' }}>
                    <TextFieldsIcon />
                </IconButton>
                <IconButton onClick={togglePanning} sx={{ color: 'white' }}>
                    <PanToolIcon />
                </IconButton>
                <IconButton onClick={toggleZoomMode} sx={{ color: zoomMode ? 'yellow' : 'white' }}>
                    <ZoomInIcon />
                </IconButton>
                <IconButton onClick={handleSave} sx={{ color: 'white' }}>
                    <SaveIcon />
                </IconButton>
            </div>
            <div className="flex-grow"/>
        </div>
    );
};

export default LeftToolbar;
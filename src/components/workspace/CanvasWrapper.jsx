import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import LeftToolbar from "./toolbar/LeftToolbar.jsx";
import {useCanvasStore} from "../../store/index.js";
import RightToolbar from "./toolbar/RightToolbar.jsx";

const CanvasWrapper = () => {
    const canvasRef = useRef(null);
    const { canvas, setCanvas, color, brushSize, brushType,
        isDrawingMode, selectedLayerId, layers, addObjectToLayer, addToUndoStack, undo, redo } = useCanvasStore();

    useEffect(() => {
        const initCanvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: false,
        });
        initCanvas.setBackgroundColor('white', initCanvas.renderAll.bind(initCanvas));
        setCanvas(initCanvas);

        return () => {
            initCanvas.dispose();
        };
    }, []);


    useEffect(() => {
        if (canvas) {
            switch (brushType) {
                case 'PencilBrush':
                    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                    break;
                case 'CircleBrush':
                    canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
                    break;
                case 'SprayBrush':
                    canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
                    break;
                default:
                    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            }
            canvas.freeDrawingBrush.color = color;
            canvas.freeDrawingBrush.width = brushSize;
        }
    }, [canvas, brushType, color, brushSize]);

    const clearCanvas = () => {
        if (canvas) {
            addToUndoStack(canvas.toJSON());
            canvas.clear();
            canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
        }
    };

    useEffect(() => {
        if (canvas) {
            canvas.isDrawingMode = isDrawingMode;
        }
    }, [isDrawingMode, canvas]);


    useEffect(() => {
        if (canvas && selectedLayerId) {
            const selectedLayer = layers.find(layer => layer.id === selectedLayerId);
            if (selectedLayer) {
                canvas.setActiveObject(selectedLayer.group);
            }
        } else if (canvas) {
            canvas.discardActiveObject();
        }
    }, [canvas, selectedLayerId, layers]);


    const handleImageUpload = (data) => {
        if (canvas) {
            addToUndoStack(canvas.toJSON());
            fabric.Image.fromURL(data, function (img) {
                img.set({
                    left: 50,
                    top: 50,
                    selectable: true,
                });

                canvas.add(img);
                canvas.renderAll();
            });
        }
    };

    const handleObjectAdded = (e) => {
        const { target } = e;
        if (selectedLayerId) {
            addObjectToLayer(target);
        }
        addToUndoStack(canvas.toJSON());
    };

    useEffect(() => {
        if (canvas) {
            canvas.on('object:added', handleObjectAdded);
            return () => {
                canvas.off('object:added', handleObjectAdded);
            };
        }
    }, [canvas, selectedLayerId]);

    const handleExport = ({ fileName, format, quality }) => {
        if (!canvas) return;

        let dataURL;
        if (format === 'json') {
            const json = JSON.stringify(canvas.toJSON());
            const blob = new Blob([json], { type: 'application/json' });
            dataURL = URL.createObjectURL(blob);
        } else if (format === 'svg') {
            const svg = canvas.toSVG();
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            dataURL = URL.createObjectURL(blob);
        } else {
            dataURL = canvas.toDataURL({
                format: format,
                quality: format === 'jpeg' ? quality : 1.0,
            });
        }

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = `${fileName}.${format}`;
        link.click();

        if (format === 'json' || format === 'svg') {
            URL.revokeObjectURL(dataURL);
        }
    };


    return (
        <div className="flex">
            <LeftToolbar clearCanvas={clearCanvas} onImageUpload={handleImageUpload} undo={undo} redo={redo} onExport={handleExport} />
            <div className="flex-grow flex justify-center items-center">
                <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />
            </div>
            <RightToolbar/>
        </div>
    );
};

export default CanvasWrapper;
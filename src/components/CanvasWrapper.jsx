import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Toolbar from "./Toolbar.jsx";
import {useCanvasStore} from "../store/index.js";

const CanvasWrapper = () => {
    const canvasRef = useRef(null);
    const { canvas, setCanvas, color, setColor, isDrawingMode,
        setIsDrawingMode, brushSize, setBrushSize, brushType, setBrushType } = useCanvasStore();

    useEffect(() => {
        const initCanvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: true,
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
            canvas.clear();
            canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
        }
    };

    useEffect(() => {
        if (canvas) {
            canvas.isDrawingMode = isDrawingMode;
        }
    }, [isDrawingMode, canvas]);

    return (
        <div className="flex">
            <Toolbar clearCanvas={clearCanvas}/>
            <div className="flex-grow flex justify-center items-center">
                <canvas ref={canvasRef} width={800} height={600} style={{border: '1px solid #000'}}/>
            </div>
        </div>
    );
};

export default CanvasWrapper;
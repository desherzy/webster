import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import ToolBar from "./Toolbar.jsx";
import BrushOptions from "./BrushOptions.jsx";

const CanvasWrapper = () => {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [brushType, setBrushType] = useState('PencilBrush');
    const [isDrawingMode, setIsDrawingMode] = useState(true);

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
        <div>
            <BrushOptions color={color} setColor={setColor} brushSize={brushSize} setBrushSize={setBrushSize} />
            <ToolBar setBrushType={setBrushType} setIsDrawingMode={setIsDrawingMode} />
            <button onClick={clearCanvas}>Clear</button>
            <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #000' }} />
        </div>
    );
};

export default CanvasWrapper;
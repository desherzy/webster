import { create } from 'zustand';

const useCanvasStore = create((set) => ({
    canvas: null,
    isDrawingMode: true,
    color: '#130c0c',
    brushType: 'PencilBrush',
    brushSize: 5,


    setColor: (newColor) => set({ color: newColor }),
    setIsDrawingMode: (newIsDrawingMode) => set( {isDrawingMode: newIsDrawingMode }),
    setBrushSize: (newThickness) => set({ brushSize: newThickness }),
    setBrushType: (newType) => set({ brushType: newType }),
    setCanvas: (canvas) => set({ canvas }),


}));


export default useCanvasStore;
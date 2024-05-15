import { create } from 'zustand';

const useCanvasStore = create((set) => ({
    canvas: null,
    tool: "",
    color: '#130c0c',
    setColor: (newColor) => set({ color: newColor }),
    lineThickness: 1,
    setLineThickness: (newThickness) => set({ lineThickness: newThickness }),
    setCanvas: (canvas) => set({ canvas }),

    updateBrushSettings: (color, thickness) => {
        const canvas = useCanvasStore.getState().canvas;
        if (canvas) {
            canvas.freeDrawingBrush.color = color;
            canvas.freeDrawingBrush.width = thickness;
        }
    },

}));


export default useCanvasStore;
import { create } from 'zustand';

const useCanvasStore = create((set) => ({
    canvas: null,
    isDrawingMode: true,
    color: '#130c0c',
    brushType: 'PencilBrush',
    brushSize: 5,
    layers: [],
    selectedLayerId: null,
    undoStack: [],
    redoStack: [],

    resetCanvasState: () => set({
        canvas: null,
        isDrawingMode: true,
        color: '#130c0c',
        brushType: 'PencilBrush',
        brushSize: 5,
        layers: [],
        selectedLayerId: null,
        undoStack: [],
        redoStack: [],
    }),

    setColor: (newColor) => set({ color: newColor }),
    setIsDrawingMode: (newIsDrawingMode) => set({ isDrawingMode: newIsDrawingMode }),
    setBrushSize: (newThickness) => set({ brushSize: newThickness }),
    setBrushType: (newType) => set({ brushType: newType }),
    setCanvas: (canvas) => set({ canvas }),
    addLayer: (layer) => set((state) => ({
        layers: [...state.layers, layer],
        selectedLayerId: layer.id
    })),
    removeLayer: (id) => set((state) => {
        const layer = state.layers.find(layer => layer.id === id);
        if (layer) {
            layer.group.forEachObject(obj => state.canvas.remove(obj));
            state.canvas.remove(layer.group);
        }
        return {
            layers: state.layers.filter(layer => layer.id !== id),
            selectedLayerId: state.selectedLayerId === id ? null : state.selectedLayerId
        };
    }),
    setLayerVisibility: (id, visible) => set((state) => {
        const layer = state.layers.find(layer => layer.id === id);
        if (layer) {
            layer.group.forEachObject(obj => {
                obj.set('visible', visible);
            });
            layer.group.set('dirty', true); // Mark the group as dirty to re-render
            state.canvas.renderAll();
        }
        return {
            layers: state.layers.map(layer =>
                layer.id === id ? { ...layer, visible } : layer
            )
        };
    }),
    selectLayer: (id) => set((state) => ({
        selectedLayerId: state.selectedLayerId === id ? null : id
    })),
    addObjectToLayer: (object) => set((state) => {
        const layer = state.layers.find(layer => layer.id === state.selectedLayerId);
        if (layer) {
            layer.group.add(object);
            layer.group.set('dirty', true);
            state.canvas.renderAll();
        }
        return { layers: state.layers };
    }),

    addToUndoStack: (state) => set((state) => ({ undoStack: [...state.undoStack, state.canvas.toJSON()], redoStack: [] })),
    undo: () => set((state) => {
        if (state.undoStack.length > 0) {
            const newRedoStack = [...state.redoStack, state.canvas.toJSON()];
            const lastState = state.undoStack.pop();
            state.canvas.loadFromJSON(lastState);
            state.canvas.renderAll();
            return { undoStack: state.undoStack, redoStack: newRedoStack };
        }
        return {};
    }),
    redo: () => set((state) => {
        if (state.redoStack.length > 0) {
            const newUndoStack = [...state.undoStack, state.canvas.toJSON()];
            const nextState = state.redoStack.pop();
            state.canvas.loadFromJSON(nextState);
            state.canvas.renderAll();
            return { undoStack: newUndoStack, redoStack: state.redoStack };
        }
        return {};
    }),

}));

export default useCanvasStore;

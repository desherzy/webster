import React from 'react';
import {useCanvasStore} from "../store/index.js";
import {Button, Checkbox, List, ListItem, ListItemText} from "@mui/material";

const Layers = () => {
    const { layers, addLayer, removeLayer, setLayerVisibility, selectLayer, selectedLayerId, canvas } = useCanvasStore();

    const handleAddLayer = () => {
        const newGroup = new fabric.Group([], { id: `layer-${layers.length + 1}` });
        canvas.add(newGroup);
        addLayer({ id: newGroup.id, visible: true, group: newGroup });
    };

    const handleRemoveLayer = (id) => {
        removeLayer(id);
    };

    const handleVisibilityToggle = (id) => {
        const layer = layers.find((layer) => layer.id === id);
        setLayerVisibility(id, !layer.visible);
    };

    const handleLayerSelect = (id) => {
        selectLayer(id);
    };

    return (
        <div className="w-64 bg-gray-200 p-4 h-screen">
            <Button variant="contained" onClick={handleAddLayer} sx={{ mb: 2 }}>
                Add Layer
            </Button>
            <List>
                {layers.map(layer => (
                    <ListItem
                        key={layer.id}
                        selected={layer.id === selectedLayerId}
                        button
                        onClick={() => handleLayerSelect(layer.id)}
                    >
                        <Checkbox
                            checked={layer.visible}
                            onChange={() => handleVisibilityToggle(layer.id)}
                        />
                        <ListItemText primary={layer.id} />
                        <Button variant="contained" color="secondary" onClick={() => handleRemoveLayer(layer.id)}>
                            Remove
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};
export default Layers;
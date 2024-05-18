import React from 'react';
import { Button, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import Layers from "./Layers.jsx";

const RightToolbar = () => {

    return (
        <div className="w-64 bg-gray-800 p-4 h-screen">
            <Layers/>
        </div>
    );
};

export default RightToolbar;
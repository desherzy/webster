import React from 'react';
import { Button, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import Layers from "../Layers.jsx";
import ImageFilters from "../image/ImageFilters.jsx";

const RightToolbar = () => {

    return (
        <div className="w-60 bg-gray-800 p-2 h-screen flex flex-col ml-5">
            <ImageFilters/>
            <Layers/>
        </div>
    );
};

export default RightToolbar;
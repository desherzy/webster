import React from 'react';
import BrushOptions from './BrushOptions';
import BrushSelect from './BrushSelect';
import { Button } from '@mui/material';

const Toolbar = ({ clearCanvas }) => {
    return (
        <div className=" flex flex-col justify-between h-screen bg-gray-800 p-4">
            <div>
                <BrushOptions/>
                <BrushSelect/>
                <Button variant="contained" onClick={clearCanvas} sx={{ mt: 2 }}>Clear</Button>
            </div>
            <div className="flex-grow" />
        </div>
    );
};

export default Toolbar;
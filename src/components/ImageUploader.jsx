import React from 'react';
import { Button } from '@mui/material';

const ImageUploader = ({ onImageUpload }) => {
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (f) {
            const data = f.target.result;
            onImageUpload(data);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                    Upload Image
                </Button>
            </label>
        </div>
    );
};

export default ImageUploader;
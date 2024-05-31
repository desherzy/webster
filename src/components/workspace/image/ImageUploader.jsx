import React from 'react';
import { IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

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
                <IconButton color="primary" component="span">
                    <ImageIcon sx={{ color: 'white', fontSize: 40 }} />
                </IconButton>
            </label>
        </div>
    );
};

export default ImageUploader;
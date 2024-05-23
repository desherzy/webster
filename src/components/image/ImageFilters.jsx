import React, {useEffect, useRef, useState} from 'react';
import {useCanvasStore} from "../../store/index.js";
import {Slider, Typography, Button, FormControlLabel, Checkbox} from '@mui/material';
import { fabric } from 'fabric';

const ImageFilters = () => {
    const { canvas } = useCanvasStore();
    const [brightness, setBrightness] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(0);
    const [blur, setBlur] = useState(0);
    const [sharpness, setSharpness] = useState(0);
    const [pixelate, setPixelate] = useState(0);
    const [invert, setInvert] = useState(false);

    const applyFilters = () => {
        if (!canvas) return;

        let activeObject = canvas.getActiveObject();
        if (!activeObject) {
            activeObject = canvas.getActiveGroup();
        }

        if (activeObject && activeObject.type === 'image') {
            let filters = [
                new fabric.Image.filters.Brightness({ brightness }),
                new fabric.Image.filters.Contrast({ contrast }),
                new fabric.Image.filters.HueRotation({ rotation: hue }),
                new fabric.Image.filters.Saturation({ saturation }),
                new fabric.Image.filters.Blur({ blur }),
            ];

            if (pixelate !== 0) {
                const pixelFilter = new fabric.Image.filters.Pixelate({ blocksize: pixelate });
                filters.push(pixelFilter);
            }

            if (invert) {
                filters.push(new fabric.Image.filters.Invert());
            }

            if (sharpness !== 0) {
                const sharpnessFilter = new fabric.Image.filters.Convolute({
                    matrix: [
                        0, -1, 0,
                        -1, 5 + sharpness, -1,
                        0, -1, 0
                    ]
                });
                filters.push(sharpnessFilter);
            }

            activeObject.filters = filters;
            activeObject.applyFilters();
            canvas.renderAll();
        }
    };

    const resetFilters = () => {
        if (!canvas) return;

        let activeObject = canvas.getActiveObject();
        if (!activeObject) {
            activeObject = canvas.getActiveGroup();
        }

        if (activeObject && activeObject.type === 'image') {
            activeObject.filters = [];
            activeObject.applyFilters();
            canvas.renderAll();
        }

        setBrightness(0);
        setContrast(0);
        setHue(0);
        setSaturation(0);
        setBlur(0);
        setSharpness(0);
        setPixelate(0);
        setInvert(false);
    };

    const handlePixelateChange  = (event, newValue) => {
        setPixelate(newValue);
        applyFilters();
    };

    const handleBrightnessChange = (event, newValue) => {
        setBrightness(newValue);
        applyFilters();
    };

    const handleContrastChange = (event, newValue) => {
        setContrast(newValue);
        applyFilters();
    };

    const handleHueChange = (event, newValue) => {
        setHue(newValue);
        applyFilters();
    };

    const handleSaturationChange = (event, newValue) => {
        setSaturation(newValue);
        applyFilters();
    };

    const handleBlurChange = (event, newValue) => {
        setBlur(newValue);
        applyFilters();
    };

    const handleSharpnessChange = (event, newValue) => {
        setSharpness(newValue);
        applyFilters();
    };

    const handleInvertChange = (event) => {
        setInvert(event.target.checked);
        applyFilters();
    };


    return (
        <div className="p-4 max-h-[50vh] overflow-y-auto">
            <Typography variant="h6">Image Filters</Typography>
            <div className="my-4">
                <Typography>Brightness</Typography>
                <Slider value={brightness} onChange={handleBrightnessChange} min={-1} max={1} step={0.01}/>
            </div>
            <div className="my-4">
                <Typography>Contrast</Typography>
                <Slider value={contrast} onChange={handleContrastChange} min={-1} max={1} step={0.01}/>
            </div>
            <div className="my-4">
                <Typography>Hue</Typography>
                <Slider value={hue} onChange={handleHueChange} min={-1} max={1} step={0.01}/>
            </div>
            <div className="my-4">
                <Typography>Saturation</Typography>
                <Slider value={saturation} onChange={handleSaturationChange} min={-1} max={1} step={0.01}/>
            </div>
            <div className="my-4">
                <Typography>Blur</Typography>
                <Slider value={blur} onChange={handleBlurChange} min={0} max={1} step={0.01}/>
            </div>
            <div className="my-4">
                <Typography>Sharpness</Typography>
                <Slider value={sharpness} onChange={handleSharpnessChange} min={-1} max={1} step={0.01}/>
            </div>
            <div className="my-4">
                <Typography>Pixelate</Typography>
                <Slider value={pixelate} onChange={handlePixelateChange} min={0} max={50}
                        step={1}/>
            </div>
            <div className="my-4">
                <FormControlLabel
                    control={<Checkbox checked={invert} onChange={handleInvertChange}/>}
                    label="Invert"
                />
            </div>
            <Button variant="contained" color="secondary" onClick={resetFilters}>
                Reset Filters
            </Button>
        </div>
    );
};

export default ImageFilters;
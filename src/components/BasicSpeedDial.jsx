import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    TextField,
} from '@mui/material';
import { useProjectsStore } from '../store/index.js';
import {Create, CreateNewFolderOutlined, Edit} from "@mui/icons-material";

const BasicSpeedDial = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const createProject = useProjectsStore((state) => state.createProject);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        await createProject(name, height, width);
        setOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 16,
                    zIndex: 100,
                }}
            >
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{
                        backgroundColor: '#242424',
                        color: 'white',
                        '& .MuiSpeedDialAction-fab': {
                            backgroundColor: '#1e1e1e',
                            color: 'white',
                        },
                    }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        icon={<CreateNewFolderOutlined />}
                        tooltipTitle="Create"
                        onClick={handleClickOpen}
                        sx={{
                            '& .MuiSpeedDialAction-fab': {
                                backgroundColor: '#1976d2',
                                color: 'white',
                            },
                        }}
                    />
                </SpeedDial>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                    },
                }}
            >
                <DialogTitle>Create Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Height"
                        type="number"
                        fullWidth
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Width"
                        type="number"
                        fullWidth
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        InputLabelProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                        InputProps={{
                            style: {
                                color: 'white',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BasicSpeedDial;
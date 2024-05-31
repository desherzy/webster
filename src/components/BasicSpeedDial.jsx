import React, {useState} from 'react';
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SpeedDialAction,
    SpeedDialIcon,
    TextField
} from "@mui/material";
import SpeedDial from '@mui/material/SpeedDial';
import SaveIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import {useProjectsStore} from "../store/index.js";



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
            <Box sx={{ marginTop: '70vh', transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction icon={<SaveIcon />} tooltipTitle="Create" onClick={handleClickOpen} />
                    <SpeedDialAction icon={<ShareIcon />} tooltipTitle="Copy" />
                </SpeedDial>
            </Box>
            <Dialog open={open} onClose={handleClose}>
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
                    />
                    <TextField
                        margin="dense"
                        label="Height"
                        type="number"
                        fullWidth
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Width"
                        type="number"
                        fullWidth
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
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
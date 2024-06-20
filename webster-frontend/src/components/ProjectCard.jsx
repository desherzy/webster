import React, {useState} from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Box,
    Avatar,
    IconButton,
    CardActions,
    CardHeader, Modal, TextField, Dialog, DialogContent, DialogActions
} from '@mui/material';
import {useProjectsStore} from "../store/index.js";
import {Delete, Edit} from "@mui/icons-material";

const ProjectCard = ({ project, onOpen }) => {
    const { deleteProject, updateProjectName } = useProjectsStore();
    const [ openEditModal, setOpenEditModal ] = useState(false);
    const [ newName, setName ] = useState(project.name);

    const handleDelete = async () => {
        await deleteProject(project.id);
    };

    const handleEdit = () => {
        setOpenEditModal(true);
    };

    const handleUpdateName = async () => {
        await updateProjectName(newName, project.id);
        setOpenEditModal(false);
    };


    return (
        <Card sx={{
            backgroundColor: '#1e1e1e',
            color: 'white',
            borderRadius: 16,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            padding: 2,
        }}>
            <CardHeader
                title={project.name}
                action={
                    <>
                        <IconButton onClick={handleEdit} sx={{ color: 'white' }}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={handleDelete} sx={{ color: 'white' }}>
                            <Delete />
                        </IconButton>
                    </>
                }
            />
            <CardContent>
                <Typography color="textSecondary" sx={{ fontSize: 14, color: '#b0b0b0' }}>
                    Creation time: {new Date(project.createdAt).toLocaleString()}
                </Typography>
                <Typography color="textSecondary" sx={{ fontSize: 14, color: '#b0b0b0' }}>
                    Last updated: {new Date(project.updatedAt).toLocaleString()}
                </Typography>
                <Box mt={2} display="flex" alignItems="center">
                    <Chip
                        label={` ${project.width} x ${project.height}`}
                        variant="outlined"
                        color="primary"
                        avatar={<Avatar sx={{ backgroundColor: '#1976d2' }}>R</Avatar>}
                        sx={{ marginRight: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onOpen}
                        sx={{
                            backgroundColor: '#1976d2',
                            padding: '8px 16px',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        Open Workspace
                    </Button>
                </Box>
            </CardContent>
            {openEditModal && (
                <Dialog  open={openEditModal}>
                    <DialogContent>
                        <TextField
                            label="New name"
                            value={newName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleUpdateName()}>Save</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Card>
    );
};

export default ProjectCard;
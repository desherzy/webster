import React, {useEffect} from 'react';
import {useProjectsStore} from "../store/index.js";
import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ProjectsList = () => {
    const { projects, getProjects } = useProjectsStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            await getProjects();
        }

        fetchProjects();
    }, [getProjects]);

    const handleNavigate = (projectId) => {
        navigate(`/projects/workspace/${projectId}`);
    };

    return (
        <Box sx={{ padding: 2 }}>
            {projects.length === 0 ? (
                <Typography variant="h6" align="center">
                    No projects available
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {project.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Created At: {new Date(project.createdAt).toLocaleString()}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Updated At: {new Date(project.updatedAt).toLocaleString()}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginTop: 2 }}
                                        onClick={() => handleNavigate(project.id)}
                                    >
                                        Open Workspace
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ProjectsList;
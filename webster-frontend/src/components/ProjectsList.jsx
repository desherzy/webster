import React, { useEffect } from 'react';
import { useProjectsStore } from "../store/index.js";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectCard from './ProjectCard';

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
        <Box sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {projects.length === 0 ? (
                <Typography variant="h6" align="center" color="white" sx={{ fontSize: 18 }}>
                    No projects available
                </Typography>
            ) : (
                <Grid container spacing={4}>
                    {projects.map((project) => (
                        <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <ProjectCard
                                project={project}
                                onOpen={() => handleNavigate(project.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ProjectsList;
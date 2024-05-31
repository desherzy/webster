import React, {useState} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText, Divider, Drawer, Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {useAuthStore} from "../store/index.js";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, user, logoutUser } = useAuthStore();
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        await logoutUser();
        navigate('/login');
    };

    const DrawerList = (
        <Box sx={{ width: 250, backgroundColor: '#333', height: '100%', color: 'white' }} role="presentation" onClick={toggleDrawer}>
            <List>
                <ListItem key="main" disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <HomeIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Main" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="projects" disablePadding>
                    <ListItemButton onClick={() => navigate('/projects')}>
                        <ListItemIcon>
                            <InboxIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                </ListItem>
                {isAuthenticated && (
                    <ListItem key="settings" disablePadding>
                        <ListItemButton onClick={() => navigate('/settings')}>
                            <ListItemIcon>
                                <SettingsIcon style={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <Divider />
            {isAuthenticated && (
                <ListItem key="logout" disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            )}
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    onClick={toggleDrawer}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Drawing App
                </Typography>
                {isAuthenticated ? (
                    <IconButton color="inherit" onClick={() => navigate('/profile')}>
                        <Avatar src={user?.profileImage || '/defaultUserImage.png'} />
                    </IconButton>
                ) : (
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Toolbar>
            <Drawer open={open} onClose={toggleDrawer}>
                {DrawerList}
            </Drawer>
        </AppBar>
    );
};

export default Header;
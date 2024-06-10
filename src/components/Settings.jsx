import React, { useState } from 'react';
import { useAuthStore } from "../store/index.js";
import {
    Avatar,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
    Box
} from '@mui/material';

function Settings() {
    const { logoutUser, uploadAvatar, updateUser, deleteUser, user } = useAuthStore();
    const [email, setEmail] = useState(user.email || '');
    const [username, setUsername] = useState(user.username || '');
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const handleUpdateUser = async () => {
        const updated = {};
        if (email !== user.email) updated.email = email;
        if (username !== user.username) updated.username = username;
        await updateUser(updated);
    };

    const handleLogout = async () => {
        await logoutUser();
    };

    const handleDeleteAccount = () => {
        setIsDeleteAlertOpen(true);
    };

    const confirmDeleteAccount = async () => {
        await deleteUser();
    };

    const handleAvatarClick = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                await uploadAvatar(file);
            }
        };
        input.click();
    };

    const getUserAvatar = () => {
        return user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    };

    return (
        <Grid container justifyContent="center" alignItems="center" className="mt-5 text-white p-4">
            <Grid item xs={11} md={6} lg={4}>
                <Box className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <Grid container direction="column" alignItems="center" spacing={2}>
                        <Grid item>
                            <div
                                onClick={handleAvatarClick}
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginBottom: '16px'
                                }}
                            >
                                <img
                                    src={getUserAvatar()}
                                    alt="User Avatar"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" className="text-white">User Settings</Typography>
                        </Grid>
                        <Grid item className="w-full">
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                className="mb-4"
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item className="w-full">
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                className="mb-4"
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item className="w-full">
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mb: 2, backgroundColor: 'blue.500', '&:hover': { backgroundColor: 'blue.700' } }}
                                onClick={handleUpdateUser}
                            >
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mb: 2, backgroundColor: 'gray.700', '&:hover': { backgroundColor: 'gray.900' } }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: 'red.500', '&:hover': { backgroundColor: 'red.700' } }}
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

            <Dialog
                open={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
            >
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteAlertOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteAccount} color="secondary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Settings;

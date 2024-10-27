import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box } from "@mui/material";
import { getUsers, deleteUser } from "../slices/userSlice";
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)`
    padding: 0.5rem;
    border: 2px solid #ddd;
    margin-bottom: 1rem;
`;


const UserManagement = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userId, setUserId] = useState("")

    

    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDelete = async (user: string) => {
        if (user) {
        setUserId(user)
        setOpenDeleteModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        if(userId){
        await dispatch(deleteUser(userId)); 
        setOpenDeleteModal(false); 
        window.location.reload()
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteModal(false);
    };

    return (
        <>
        <Typography variant="h2">User Management</Typography>
        {users.map((user) => (
            <StyledBox key={user.id}> 
            <Typography variant="h3">              
            <div>{user.name}</div></Typography> 
            <Typography variant="body1">
            <div>Role: {user.roles}</div>
            <div>User Email: {user.email} </div>
            </Typography>
            <Button sx={{ marginTop: 1, backgroundColor:"#c62828"}} variant="contained" onClick={() => handleDelete(user.id)}>Delete</Button>
            </StyledBox>
        ))}

        <Dialog open={openDeleteModal} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
            <DialogContentText>Are you sure you want to delete this event?</DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default UserManagement;
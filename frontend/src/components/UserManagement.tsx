import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getUsers, deleteUser } from "../slices/userSlice";

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
        <h1>User Management</h1>
        {users.map((user) => (
            <div key={user.id}>                
            <h4>{user.name}</h4>
            <h5>{user.roles}</h5>
            User Email: {user.email} 
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
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
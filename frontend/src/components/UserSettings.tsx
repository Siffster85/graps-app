import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUsers } from "../slices/userSlice";

const UserSettings = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users);
    
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <>
        <h1>User Settings</h1>
        {users.map((user) => (
            <div key={user.id}>                
            <h4>{user.name}</h4>
            <h5>{user.roles}</h5>
            User Email: {user.email} 
            </div>
        ))}
        </>
    );
};

export default UserSettings;
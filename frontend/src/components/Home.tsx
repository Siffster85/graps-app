import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import SearchEvents from './Events';


const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

    useEffect(() => {
        if (basicUserInfo) {
        dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo]);

    const handleLogout = async () => {
        try {
        await dispatch(logout()).unwrap();
        navigate("/login");
        } catch (e) {
        console.error(e);
        }
    };
    return (
        <div>
            <h4>Name: {userProfileInfo?.name}</h4>
            <h4>Email: {userProfileInfo?.email}</h4>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
            Logout
            </Button>
            <SearchEvents />
        </div>
    )
}

export default Home
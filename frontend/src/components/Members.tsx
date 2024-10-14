import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import SearchEvents from './Events'

const Members = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
    //console.log("basic", basicUserInfo, "profile", userProfileInfo);

    useEffect(() => {
        if (basicUserInfo) {            
        dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo, dispatch]);

    const handleLogout = async () => {
        try {
        await dispatch(logout()).unwrap();
        navigate("/");
        } catch (e) {
        console.error(e);
        }
    };
    return (
        <div>
            <h4>Name: {userProfileInfo?.name}</h4>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
            Logout
            </Button>
        <SearchEvents />
        </div>
    )
    }

export default Members
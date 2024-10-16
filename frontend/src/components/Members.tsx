import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import SearchEvents from './LocalEvents'
import EventsTable from "./events/EventsTable";

const Members = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

    useEffect(() => {
        if (basicUserInfo) {            
        dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo, dispatch]);

    return (
        <div>
        <EventsTable />
        <SearchEvents />
        </div>
    )
    }

export default Members
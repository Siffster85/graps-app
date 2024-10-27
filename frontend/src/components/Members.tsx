import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser } from "../slices/authSlice";
import SearchEvents from './LocalEvents'
import EventsTable from "./events/EventsTable";

const Members = () => {
    const dispatch = useAppDispatch();

    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

    useEffect(() => {
        if (basicUserInfo) {            
        dispatch(getUser(basicUserInfo.id));
        }
    }, [basicUserInfo, dispatch]);

    return (
        <>
        <EventsTable />
        <SearchEvents />
        </>
    )
    }

export default Members
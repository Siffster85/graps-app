import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";

const DefaultLayout = () => {
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

    if (basicUserInfo) {
        console.log("logged in", basicUserInfo);
        return <Navigate replace to={"/members"} />;
    }

    return (
        <>
        <Outlet />
        </>
    );
    };

export default DefaultLayout;
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";
import { ErrorResponse } from "../constants";

type UserInfo = {
    id: string;
    name: string;
    email: string;
    roles: string[];
};

type UserApiState = {
    users: UserInfo[];
    status: "idle" | "loading" | "failed";
    error: string | null;
};

const initialState: UserApiState = {
    users: [],
    status: "idle",
    error: null,
};

export const getUsers = createAsyncThunk(
    "users/getAll",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.get("/users");
        return response.data;
        } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const errorResponse = error.response.data;

            return rejectWithValue(errorResponse);
        }

        throw error;
        }
    }
);

export const deleteUser = createAsyncThunk(
    "events/deleteOne",
    async (userId: string, { rejectWithValue }) => {        
        try {
            const response = await axiosInstance.delete(`/users/user-admin/${userId}`);
            return response.data;
            } catch (error) {            
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;
                return rejectWithValue(errorResponse);
            }
            throw error;
        }
    }
    );

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(
            getUsers.fulfilled,
            (state, action: PayloadAction<UserInfo[]>) => {
            state.status = "idle";
            state.users = action.payload;
            }
        )
        .addCase(getUsers.rejected, (state, action) => {
            state.status = "failed";
            if (action.payload) {
            state.error =
                (action.payload as ErrorResponse).message ||
                "Retrieving users failed";
            } else {
            state.error = action.error.message || "Retrieving users failed";
            }
        })
        .addCase(deleteUser.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = "idle";
            const entityId = action.payload;
            state.users = state.users.filter((user) => user.id !== entityId);
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to delete task.";
        });
    },
});

export default userSlice.reducer;
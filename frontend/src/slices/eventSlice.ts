import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";

export type NewEvent = {
    name: string;
    description: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    capacity: number;
};

export type Event = NewEvent & {
    id: string;
    attendees: [string];
};

interface EventState {
    events: Event[];
    selectedEvent: Event | undefined;
    status: "idle" | "loading" | "failed";
    error: string | null;
}

export type Attendance = {
    type: string,
    userId: string,
    eventId: string,
}

const initialState: EventState = {
    events: [],
    selectedEvent: undefined,
    status: "idle",
    error: null,
};

export const getEvents = createAsyncThunk(
    "events/getAll",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.get("/events");
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

export const getEvent = createAsyncThunk(
    "events/getOne",
    async (eventId: string, { rejectWithValue }) => {
        try {
        const response = await axiosInstance.get(`/events/${eventId}`);
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

export const attendEvent = createAsyncThunk(
    "events/attendEvent",
    async (payload: Attendance, {rejectWithValue}) => {
        const type = payload.type
        const userId = payload.userId
        const eventId = payload.eventId
        try{
            let payload = {}
            if(type === "attend"){
                payload = {
                    $push: { attendees: userId }
                };
            }
            if(type === "cancel"){
                payload = {
                    $pull: { attendees: userId }
                };
            }
            const response = await axiosInstance.patch(`/events/${eventId}/attend`, {
            payload
            });
            return response.data;
        } catch (error) {            
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data;
                return rejectWithValue(errorResponse);
            }
            throw error;
            }
        }
)

export const createEvent = createAsyncThunk(
    "events/createOne",
    async (event: NewEvent, { rejectWithValue }) => {
        try {
        const eventPayload: NewEvent = {
            name: event.name,
            description: event.description,
            startDateTime: event.startDateTime, 
            endDateTime: event.endDateTime,
            capacity: event.capacity,
        };
        const response = await axiosInstance.post("/events", eventPayload);
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

export const deleteEvent = createAsyncThunk(
    "events/deleteOne",
    async (eventId: string, { rejectWithValue }) => {   
        try {
            const response = await axiosInstance.delete(`/events/admin/${eventId}`);
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

export const updateEvent = createAsyncThunk(
    "events/updateOne",
    async (event: Event, { rejectWithValue }) => {
        try {
        const updateEventPayload: Event = {
            id: event.id,
            name: event.name,
            description: event.description,
            startDateTime: event.startDateTime, 
            endDateTime: event.endDateTime,
            capacity: event.capacity,
            attendees: event.attendees
        };
        const response = await axiosInstance.patch(
            `/events/${event.id}`,
            updateEventPayload
        );
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

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.pending, (state) => {
            state.status = "loading";
        })
        .addCase(
            getEvents.fulfilled,
            (state, action: PayloadAction<Event[]>) => {
            state.status = "idle";
            state.events = action.payload;
            }
        )
        .addCase(getEvents.rejected, (state) => {
            state.status = "failed";
            state.events = [];
        })
        .addCase(getEvent.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(
            getEvent.fulfilled,
            (state, action: PayloadAction<Event>) => {
            state.status = "idle";
            state.selectedEvent = action.payload;
            }
        )
        .addCase(getEvent.rejected, (state, action) => {
            state.status = "failed";
            state.selectedEvent = undefined;
            state.error = action.error.message || "Failed to fetch event.";
        })

        .addCase(createEvent.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(
            createEvent.fulfilled,
            (state, action: PayloadAction<Event>) => {
            state.status = "idle";
            state.events.push(action.payload);
            }
        )
        .addCase(createEvent.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to add event.";
        })

        .addCase(updateEvent.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(
            updateEvent.fulfilled,
            (state, action: PayloadAction<Event>) => {
            state.status = "idle";
            const updatedEvent = action.payload;
            const index = state.events.findIndex(
                (event) => event.id === updatedEvent.id
            );
            if (index !== -1) {
                state.events[index] = updatedEvent;
            }
        })
        .addCase(updateEvent.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to update event.";
        })

        .addCase(attendEvent.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(
            attendEvent.fulfilled,
            (state, action: PayloadAction<Event>) => {
            state.status = "idle";
            const updatedEvent = action.payload;
            const index = state.events.findIndex(
                (event) => event.id === updatedEvent.id
            );
            if (index !== -1) {
                state.events[index] = updatedEvent;
            }
        })
        .addCase(attendEvent.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to update event.";
        })
        .addCase(deleteEvent.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = "idle";
            const entityId = action.payload;
            state.events = state.events.filter((event) => event.id !== entityId);
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to delete task.";
        });
    },
});

export default eventSlice.reducer;
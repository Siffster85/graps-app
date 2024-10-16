import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { AxiosError } from "axios";

export type NewEvent = {
    name: string;
    description: string;
    date: string
    capacity: number
};

export type Event = NewEvent & {
    id: string;
};

interface EventState {
    events: Event[];
    selectedEvent: Event | undefined;
    status: "idle" | "loading" | "failed";
    error: string | null;
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
    async (eventId: number, { rejectWithValue }) => {
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

export const createEvent = createAsyncThunk(
    "events/createOne",
    async (event: NewEvent, { rejectWithValue }) => {
        try {
        const eventPayload: NewEvent = {
            name: event.name,
            description: event.description,
            date: event.date,
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

export const updateEvent = createAsyncThunk(
    "events/updateOne",
    async (event: Event, { rejectWithValue }) => {
        try {
        const updateEventPayload: NewEvent = {
            name: event.name,
            description: event.description,
            date: event.date,
            capacity: event.capacity,
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

// export const fetchEvents = createAsyncThunk(
//     'events/fetchevents',
//     async () => {
//         const response = await axios.get(`${backendBaseUrl}/events`)
//         return response.data
//     }
// )

// export const getEvent = createAsyncThunk(
//   "events/getevent",
//   async (eventId: number) => {
//     const response = await axios.get(`${backendBaseUrl}/events/${eventId}`);
//     return response.data;
//   }
// );

// export const addEvent = createAsyncThunk(
//     "events/addevent",
//     async (event: NewEvent) => {
//       const eventPayload: NewEvent = {
//         name: event.name,
//         description: event.description
//       };
//       const response = await axios.post(`${backendBaseUrl}/events`, eventPayload);
//       return response.data;
//     }
//   );

// export const updateEvent = createAsyncThunk(
//   "events/updateevent",
//   async (event: Event) => {
//     const updateEventPayload: NewEvent = {
//       name: event.name,
//       description: event.description
//     };
//     const response = await axios.patch(
//       `${backendBaseUrl}/events/${event.id}`,
//       updateeventPayload
//     );
//     return response.data;
//   }
// );

export const eventSlice = createSlice({
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
            }
        )
        .addCase(updateEvent.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || "Failed to update event.";
        });
    },
});

export default eventSlice.reducer;
import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEvent, deleteEvent } from "../../slices/eventSlice";
import { useParams, useNavigate } from "react-router-dom";

const EventManager = () => {
    const dispatch = useAppDispatch();
    const event = useAppSelector((state) => state.events.selectedEvent);
    const { eventId } = useParams();
    const navigate = useNavigate()

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        if (eventId) {
        dispatch(getEvent(eventId));
        }
    }, [eventId, dispatch]);

    const handleDelete = async () => {
        if (eventId) {
        setOpenDeleteModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        if(eventId){
        await dispatch(deleteEvent(eventId)); 
        setOpenDeleteModal(false); 
        navigate("/admin")
        }
    };

    const handleCancelDelete = () => {
        setOpenDeleteModal(false);
    };

    return (
        <div>
        {event ? (
            <div key={event.id}>
            <>{event.date}</>
            <h4>{event.name}</h4>
            <p>{event.description}</p>
            <p> Capacity remaining: {event.capacity - event.attendees.length}</p>
            <p>Attendees:</p>
            {event.attendees.map((attendee) => (
            <ul>{attendee}</ul>
            ))}
            <button>Amend</button>
            <button onClick={handleDelete}>Delete</button>
            </div>
        ) : (
            <p>Loading event...</p>
        )}

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
        </div>
    );
};

export default EventManager;
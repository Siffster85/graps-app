import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEvent, deleteEvent, updateEvent } from "../../slices/eventSlice";
import { getUsers } from "../../slices/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const EventManager = () => {
    const dispatch = useAppDispatch();
    const event = useAppSelector((state) => state.events.selectedEvent);
    const users = useAppSelector((state) => state.users.users);
    const { eventId } = useParams();
    const navigate = useNavigate()

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updatedName, setUpdatedName] = useState(event?.name || "");
    const [updatedDescription, setUpdatedDescription] = useState(event?.description || "");
    const [updatedStartDateTime, setUpdatedStartDateTime] = useState(event?.startDateTime || null);
    const [updatedEndDateTime, setUpdatedEndDateTime] = useState(event?.endDateTime || null);
    const [updatedCapacity, setUpdatedCapacity] = useState(event?.capacity || 0);

    useEffect(() => {
        if (eventId) {
        dispatch(getUsers());;
        dispatch(getEvent(eventId))
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

    const handleUpdate = async () => {
        if(event){
        setUpdatedName(event.name)
        setUpdatedDescription(event.description)
        setUpdatedStartDateTime(event.startDateTime)
        setUpdatedEndDateTime(event.endDateTime)
        setUpdatedCapacity(event.capacity)
        }
        setOpenUpdateModal(true)
    }
    const confirmUpdate = async () => {
        
        if (eventId && event) {
            await dispatch(
            updateEvent({
                id: eventId,
                name: updatedName,
                description: updatedDescription,
                startDateTime: updatedStartDateTime,
                endDateTime: updatedEndDateTime,
                capacity: updatedCapacity,
                attendees: event?.attendees
            })
            );
            dispatch(getEvent(eventId));
            setOpenUpdateModal(false);
            }
        }

    return (
        <div>
        {event ? (
            <div key={event.id}>
            <h4>{event.name}</h4>
            <p>Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</p>    
            <p>End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</p>   
            <p>{event.description}</p>
            <p> Capacity remaining: {event.capacity - event.attendees.length}</p>
            <p>Attendees:</p>
            {event.attendees.map((attendeeId) => {
            const userId = users.find(user => user.id === attendeeId);
            return <ul key={attendeeId}>{userId?.name}</ul>
            })}
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>

            <Dialog open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
            <DialogTitle>Update Event</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}  

                />
                <TextField
                margin="dense"
                label="Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start Date and Time"
                    format="DD / MM / YYYY hh:mm a"
                    value={updatedStartDateTime ? dayjs(updatedStartDateTime) : null}
                    onChange={(newValue) => {
                    if (newValue) {
                        setUpdatedStartDateTime(newValue.toDate());
                    }
                    }}
                />
                <DateTimePicker
                    label="End Date and Time"
                    format="DD / MM / YYYY hh:mm a"
                    value={updatedEndDateTime ? dayjs(updatedEndDateTime) : null}
                    onChange={(newValue) => {
                    if (newValue) {
                        setUpdatedEndDateTime(newValue.toDate());
                    }
                    }}
                />
                </LocalizationProvider>
                <TextField
                margin="dense"
                label="Capacity"
                type="number"
                fullWidth
                value={updatedCapacity}
                onChange={(e) => setUpdatedCapacity(parseInt(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenUpdateModal(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={confirmUpdate}>
                Update
                </Button>
            </DialogActions>
            </Dialog>
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
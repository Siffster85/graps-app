import * as React from "react";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography, Box} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEvent, deleteEvent, updateEvent } from "../../slices/eventSlice";
import { getUsers } from "../../slices/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { styled } from '@mui/material/styles';

const StyledEventBox = styled(Box)`
  /* Add your desired styles here */
    padding: 1rem;
    border: 2px solid #ddd;
    margin-bottom: 1rem;
`;


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
            <StyledEventBox key={event.id} sx={{marginBottom: 2}}>
            <Typography variant='h3' sx={{marginBottom: 1 }}>{event.name}
            </Typography>
            <Typography variant="body1" component="p">
            <div> Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</div>     
            <div> End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</div>    
            <div> {event.description}</div> 
            <div>  Capacity remaining: {event.capacity - event.attendees.length}</div> 
            <div> Attendees:</div> 
            {event.attendees.map((attendeeId) => {
            const userId = users.find(user => user.id === attendeeId);
            return <ul key={attendeeId}>{userId?.name}</ul>
            })}
            <Button sx={{ margin: 1}}
                    variant="contained" onClick={handleUpdate}>Update</Button>
            <Button sx={{ margin: 1, backgroundColor:"#c62828"}} variant="contained" onClick={handleDelete}>Delete</Button>
            </Typography>
            
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
                    sx={{ marginY: 1 }} 
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
                    sx={{ marginY: 1 }} 
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
            </StyledEventBox>
        ) : (
            <div> Loading event...</div> 
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
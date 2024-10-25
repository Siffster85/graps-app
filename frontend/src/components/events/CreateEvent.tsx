import React, { useState } from 'react';
import { useAppDispatch } from "../../hooks/redux-hooks";
import { createEvent } from '../../slices/eventSlice';
import { TextField, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers/';
import { showNotification, NotificationType} from "../../slices/notificationSlice";
import dayjs from 'dayjs';


function CreateEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDateTime, setStartDateTime] = useState<Date | null>(null);
    const [endDateTime, setEndDateTime] = useState<Date | null>(null);
    const [capacity, setCapacity] = useState(''); 

    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent = {
        name,
        description,
        startDateTime,
        endDateTime,
        capacity: parseInt(capacity),
        };
        
        if (name && description && startDateTime && endDateTime && capacity){
            dispatch(createEvent(newEvent));
            setName('');
            setDescription('');
            setStartDateTime(null);
            setEndDateTime(null);
            setCapacity('');
        } else {
            dispatch(
                showNotification({
                    message: "Please provide all details",
                    type: NotificationType.Error,
                })
            )
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField  
        
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"  
        
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Start Date and Time"
                format=" DD / MM / YYYY hh:mm a"
                value={startDateTime ? dayjs(startDateTime) : null}
                onChange={(newValue) => {
                    if (newValue) {
                    setStartDateTime(newValue.toDate());
                    }
                }}
            />
            <DateTimePicker
                label="Finish Date and Time"
                format=" DD / MM / YYYY hh:mm a"
                value={endDateTime ? dayjs(endDateTime) : null}
                onChange={(newValue) => {
                    if (newValue) {
                    setEndDateTime(newValue.toDate());
                    }
                }}
            />
            </LocalizationProvider>
            <TextField
                label="Capacity"  
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
            >
                Create Event
            </Button>
        </form>
    );
}

export default CreateEvent;
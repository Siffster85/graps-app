import React, { useState } from 'react';
import { useAppDispatch } from "../../hooks/redux-hooks";
import { createEvent } from '../../slices/eventSlice';
import { TextField, Button } from '@mui/material';

function CreateEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [capacity, setCapacity] = useState('');  

    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEvent = {
        name,
        description,
        date,
        capacity: parseInt(capacity),
        };
        dispatch(createEvent(newEvent));
        // Reset form fields or handle other actions as needed
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
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                margin="normal"
            />
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
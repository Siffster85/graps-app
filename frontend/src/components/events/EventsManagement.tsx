import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents } from '../../slices/eventSlice'
import dayjs from 'dayjs';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledEventBox = styled(Box)`
  /* Add your desired styles here */
    padding: 1rem;
    border: 2px solid #ddd;
    margin-bottom: 1rem;
`;

const EventsManagerment = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.events.events);
    
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
        <Typography variant="h2" sx={{ marginY: 3}}>
        <div>Events Management</div></Typography>
        {events.map((event) => (
            <StyledEventBox key={event.id} sx={{marginBottom: 2}}>
            <Typography variant='h3' sx={{marginBottom: 1 }}>{event.name}
            </Typography>
            <Typography variant="body1" component="p">
            <div> Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</div> 
            <div> End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</div> 
            <div> {event.description}</div> 
            <div>Capacity: {event.capacity} <br />
            Capacity remaining: {event.capacity - event.attendees.length}</div>
            <Button variant="contained" href ={`event/admin/${event.id}`} sx={{marginTop: 1}}>Manage Event</Button>
            </Typography>
            </StyledEventBox>
        ))}
        </>
    );
};

export default EventsManagerment
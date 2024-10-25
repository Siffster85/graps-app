import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents } from '../../slices/eventSlice'
import dayjs from 'dayjs';

const EventsTable = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.events.events);
    
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
        <h1>Events Table</h1>
        {events.map((event) => (
            <div key={event.id}>  
            <h4>{event.name}</h4>
            <p>Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</p>    
            <p>End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</p>                
            <p>{event.description}</p>
            {event.capacity}
            <a href ={`events/${event.id}`}>Details</a>
            </div>
        ))}
        </>
    );
    };

export default EventsTable
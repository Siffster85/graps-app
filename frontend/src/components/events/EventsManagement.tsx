import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents } from '../../slices/eventSlice'
import dayjs from 'dayjs';

const EventsManagerment = () => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state) => state.events.events);
    
    useEffect(() => {
        dispatch(getEvents());
    }, []);

    return (
        <>
        <h1>Events Management</h1>
        {events.map((event) => (
            <div key={event.id}>  
            <h4>{event.name}</h4>
            <>{dayjs(event.dateTime).format('DD/MM/YYYY HH:mm')}</>              
            <p>{event.description}</p>
            Capacity: {event.capacity}
            <a href ={`event/admin/${event.id}`}>Manage Event</a>
            </div>
        ))}
        </>
    );
};

export default EventsManagerment
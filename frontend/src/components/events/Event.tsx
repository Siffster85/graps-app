import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvent } from '../../slices/eventSlice'
import { useParams } from 'react-router-dom'

const Event = () => {
    const dispatch = useAppDispatch();
    const event = useAppSelector((state) => state.events.selectedEvent);
    const {eventId} = useParams()   
    
    useEffect(() => {
        if(eventId){
        dispatch(getEvent(eventId));
        }
    }, [eventId, dispatch]);

    return (
        <div>
        {event ? (
            <div key={event.id}>
                <>{event.date}</>
                <h4>{event.name}</h4>
                <h5>{event.description}</h5>
                {event.capacity}
                <button>Attend</button>
            </div>
            ) : (
            <p>Loading event...</p>
            )} 
        </div>
    )
    }

export default Event
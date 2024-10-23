import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { attendEvent, getEvent } from '../../slices/eventSlice'
import { useParams } from 'react-router-dom'

const Event = () => {
    const dispatch = useAppDispatch();
    const event = useAppSelector((state) => state.events.selectedEvent);
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const {eventId} = useParams()   
    
    useEffect(() => {
        if(eventId){
        dispatch(getEvent(eventId));
        }
    }, [eventId, dispatch]);

    const handleAttend = () => {
        if( event && eventId && basicUserInfo){
            console.log("frontend");
            
            const attend = {userId: basicUserInfo.id, eventId: eventId}
            dispatch(attendEvent(attend))
        }
    }

    return (
        <div>
        {event ? (
            <div key={event.id}>
                <>{event.date}</>
                <h4>{event.name}</h4>
                <p>{event.description}</p>
                {(event.capacity - event.attendees.length) >= 1 ? 
                <button onClick={handleAttend}>Attend</button> : "Fully Booked!"}
            </div>
            ) : (
            <p>Loading event...</p>
            )} 
        </div>
    )
    }

export default Event
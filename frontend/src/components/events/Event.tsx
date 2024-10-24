import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { attendEvent, getEvent } from '../../slices/eventSlice'
import { useParams, useNavigate } from 'react-router-dom'

const Event = () => {
    const dispatch = useAppDispatch();
    const event = useAppSelector((state) => state.events.selectedEvent);
    const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
    const {eventId} = useParams()   
    const userId = basicUserInfo?.id 
    const navigate = useNavigate()
    
    useEffect(() => {
        if(eventId){
        dispatch(getEvent(eventId));
        }
    }, [eventId, dispatch]);

    const handleAttend = () => {
        if( event && eventId && basicUserInfo){
            console.log("frontend");
            
            const payload = {type: "attend", userId: basicUserInfo.id, eventId: eventId}
            dispatch(attendEvent(payload))
            navigate("/members")
        }
    }

    const handleCancel = (eventId: string) => {
        if(userId && eventId){
            const payload = {type: "cancel", userId: userId, eventId: eventId}
            dispatch(attendEvent(payload))
            navigate("/members")
        }
        }

    return (
        <div>
        {event ? (
            <div key={event.id}>
                <>{event.date}</>
                <h4>{event.name}</h4>
                <p>{event.description}</p>
                { basicUserInfo?.roles.includes("ADMIN") ? (`Current spots: ${event.capacity - event.attendees.length}`) : eventId && userId && event.attendees.includes(userId) ? (
                <button onClick={() => handleCancel(eventId)}>Cancel</button>
                ) : event.capacity > event.attendees.length && userId && !event.attendees.includes(userId) ? (
                    <button onClick={() => handleAttend()}>Attend</button>
                ) : (
                "Fully Booked!"
                )}
            </div>
            ) : (
            <p>Loading event...</p>
            )} 
        </div>
    )
    }

export default Event
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { attendEvent, getEvent } from '../../slices/eventSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs'

const StyledEventBox = styled(Box)`
  /* Add your desired styles here */
    padding: 1rem;
    border: 2px solid #ddd;
    margin-bottom: 1rem;
`;


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
            const payload = {type: "attend", userId: basicUserInfo.id, eventId: eventId}
            dispatch(attendEvent(payload))
            navigate("/members", { replace: true })
        }
    }

    const handleCancel = (eventId: string) => {
        console.log(eventId);
        
        if(userId && eventId){
            const payload = {type: "cancel", userId: userId, eventId: eventId}
            dispatch(attendEvent(payload))
            navigate("/members", { replace: true })
        }
        }

    return (
        <>
        {event ? (
            <StyledEventBox key={event.id}> 
                <Typography variant="h3" component="h3"><h3>{event.name}</h3></Typography>
                <Typography variant="body1">
                <div>Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</div>    
                <div>End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</div> 
                <div>{event.description}</div>
                { basicUserInfo?.roles.includes("ADMIN") ? (  
                    <div>
                    Currently Booked: {event.attendees.length}
                    <br />
                    Remaining Spaces: {event.capacity - event.attendees.length}
                    </div>) : 
                    eventId && userId && event.attendees.includes(userId) ? (
                <>
                <Button sx={{ margin: 1}}
                    variant="contained"
                    href={`https://calendar.google.com/calendar/r/eventedit?action=TEMPLATE&dates=${event.startDateTime}%2F${event.endDateTime}&stz=Europe/Brussels&etz=Europe/Brussels&text=${event.name}`} target="_blank" rel="noopener noreferrer">
                    Add to Google Calendar
                </Button>
                <Button sx={{ margin: 1, backgroundColor:"#c62828"}} variant="contained" onClick={() => handleCancel(eventId)}>Cancel Booking</Button> 
                </>
                ) : event.capacity > event.attendees.length && userId && !event.attendees.includes(userId) ? (
                    <Button sx={{ margin: 1, backgroundColor:"#00c853" }}
                    variant="contained"onClick={() => handleAttend()}>Attend</Button>
                ) : (
                <div>Fully Booked!</div>
                )}
                </Typography>
            </StyledEventBox>
            ) : (
                <Typography variant="body1" component="p">
            <p>Loading event...</p>
            </Typography>
            )} 
        </>
    )
    }

export default Event
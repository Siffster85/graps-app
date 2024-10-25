import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents, attendEvent } from '../../slices/eventSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import dayjs from 'dayjs'


const MyEvents = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userId = basicUserInfo?.id 
  const navigate = useNavigate()

  useEffect(() => {
      dispatch(getEvents());
  }, [dispatch]);

  const handleCancel = (eventId: string) => {
    if(userId && eventId){
        const payload = {type: "cancel", userId: userId, eventId: eventId}
        dispatch(attendEvent(payload))
        navigate("/members")
      }
    }

  return (
      <>
      <h1>Booked Events</h1>
      {events.map((event) => (
      event.attendees && userId && event.attendees.includes(userId) ? (
      <div key={event.id}>  
      <h4>{event.name}</h4>
      <p>Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</p>    
      <p>End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</p>                  
      <p>{event.description}</p>
      <Button 
        variant="contained"
        href={`https://calendar.google.com/calendar/r/eventedit?action=TEMPLATE&dates=${event.startDateTime}%2F${event.endDateTime}&stz=Europe/Brussels&etz=Europe/Brussels&text=${event.name}`} target="_blank" rel="noopener noreferrer">
        Add to Google Calendar
      </Button>
      <Button variant="contained" onClick={() => handleCancel(event.id)}>Cancel Booking</Button> 
    </div>
  ) : null
))}
      </>
  );
  };

export default MyEvents
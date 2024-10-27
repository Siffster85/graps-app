import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents, attendEvent } from '../../slices/eventSlice'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledEventBox = styled(Box)`
  /* Add your desired styles here */
    padding: 0.5rem;
    border: 2px solid #ddd;
    margin-bottom: 1rem;
`;


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
        navigate("/members", { replace: true })
      }
    }

  return (
      <>
      <Typography variant="h2" component="h2">
      <h2>My Booked Events</h2>
      </Typography>
      {events.map((event) => (
        event.attendees && userId && event.attendees.includes(userId) ? (
      <StyledEventBox key={event.id}> 
      <Typography variant="h3" component="h3">
      <h3>{event.name}</h3>
      </Typography>
      <Typography variant="body1">
      <div>Start: {dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')}</div>    
      <div>End: {dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}</div>                  
      <div>{event.description}</div>
      <Button sx={{ margin: 1}}
        variant="contained"
        href={`https://calendar.google.com/calendar/r/eventedit?action=TEMPLATE&dates=${event.startDateTime}%2F${event.endDateTime}&stz=Europe/Brussels&etz=Europe/Brussels&text=${event.name}`} target="_blank" rel="noopener noreferrer">
        Add to Google Calendar
      </Button>
      <Button sx={{ margin: 1, backgroundColor:"#c62828"}} variant="contained" onClick={() => handleCancel(event.id)}>Cancel Booking</Button> 
      </Typography>
      </StyledEventBox>
    ) : null
  ))}
      </>
  );
  };

export default MyEvents
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents, attendEvent } from '../../slices/eventSlice'
import { useNavigate } from 'react-router-dom'
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
      <h1>My Events</h1>
      {events.map((event) => (
      event.attendees && userId && event.attendees.includes(userId) ? (
      <div key={event.id}>  
      <h4>{event.name}</h4>
      <>{dayjs(event.dateTime).format('DD/MM/YYYY HH:mm')}</>               
      <p>{event.description}</p>
      <button onClick={() => handleCancel(event.id)}>Cancel</button> 
    </div>
  ) : null
))}
      </>
  );
  };

export default MyEvents
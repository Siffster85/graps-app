import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getEvents } from '../../slices/eventSlice'

const EventsTable = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  
  useEffect(() => {
      dispatch(getEvents());
  }, []);

  return (
      <>
      <h1>Events Table</h1>
      {events.map((event) => (
          <div key={event.id}>  
          <>{event.date}</>              
          <h4>{event.name}</h4>
          <h5>{event.description}</h5>
          {event.capacity}
          </div>
      ))}
      </>
  );
};

export default EventsTable
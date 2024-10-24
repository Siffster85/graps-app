import axios from 'axios';
import { useEffect, useState } from 'react';

interface Event {
    id: string;
    eventname: string;
    description: string;
    date: string;
    link: string;
    largeimageurl: string;
}

interface SkiddleApiResponse {
    results: Event[];
}

const apiKey = process.env.REACT_APP_SKIDDLE_API_KEY;


const useSkiddleEvents = (searchQuery: string, latitude: number, longitude: number, radius: number) => {
    const [events, setEvents] = useState<Event[]>();
    const [error, setError] = useState<string | null>();    
    
    useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await axios.get<SkiddleApiResponse>(
            `https://www.skiddle.com/api/v1/events/search/?api_key=${apiKey}`,
            {
            params: {
                keyword: searchQuery,
                latitude: `${latitude}`,
                longitude: `${longitude}`,
                radius: `${radius}`,
                },
            }
            
        );
            setEvents(response.data.results);
        } catch (error: any) {
            setError(error.message);
        }
        };

        fetchEvents();
    }, [ searchQuery, longitude, latitude, radius ]);

    return { events, error };
    };

    function SearchEvents() {
    const { events, error } = useSkiddleEvents('wrestling', 53.4808, -2.2401, 25);

    if (error) {
        return <div>Error fetching events: {error}</div>;
    }
    //need to put this into a grid so it displays nicer
    return (
        <div>
            
            <h1> Local Wrestling </h1>
            {events?.map((event) => (
                
                <div key={event.id}>
                <h2>{event.eventname}</h2>
                <img src={event.largeimageurl} alt="Wrestling Poster"/>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <a href={event.link} target="_blank" rel="noopener noreferrer">Buy A Ticket</a>
                </div>
        ))}
        </div>
    );
    }

export default SearchEvents
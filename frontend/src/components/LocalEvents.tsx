import axios from 'axios';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'mui-image'; 

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
        <Grid container spacing={2}>
        {events?.map((event: Event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Image src={event.largeimageurl} alt={event.eventname + ' Poster'} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 2 }}>
                  <h2>{event.eventname}</h2>
                  <p>{event.description}</p>
                  <p>{event.date}</p>
                  <a href={event.link} target="_blank" rel="noopener noreferrer">
                    Buy A Ticket
                  </a>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
    }

export default SearchEvents
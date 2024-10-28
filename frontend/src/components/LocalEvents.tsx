import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography, Tooltip } from '@mui/material'; 


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
    return (
        <Grid container spacing={2}>
        {events?.map((event: Event) => (
          <Grid item xs={12} sm={6} lg={4} key={event.id}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
              <Tooltip title={event.description} placement='top-start' arrow>
                <Box sx={{
                    width: { xs: '100%' }, 
                    margin: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '250px',
                    '&:hover': {
                      opacity: 0.8 
                    }
                  }}>
                  <Box
                    component="img"
                    src={event.largeimageurl}
                    alt={event.eventname + ' Poster'}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      padding: 1, 
                    }}
                  />
                </Box>
              </Tooltip>
              </Grid>
              <Grid item xs={6} sm={6} sx={{paddingRight: 2}}>
                <Box sx={{ 
                  width: { xs: '100%'}, 
                  margin: 1, 
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '250px', }}>
                  <Typography variant="h2">{event.eventname}</Typography>
                  <Typography variant="body1">{event.date}</Typography>
                  <Button variant="contained" href={event.link} target="_blank" rel="noopener noreferrer">
                    Skiddle
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
    }

export default SearchEvents
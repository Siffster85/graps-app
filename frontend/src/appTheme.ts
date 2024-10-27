import { createTheme } from '@mui/material/styles';
import '@fontsource/bebas-neue';
import '@fontsource/open-sans';
import '@fontsource/montserrat';

const appTheme = createTheme({
    palette: {
        primary: {
        main: '#007bff', // Primary color (e.g., blue)
        },
        secondary: {
        main: '#ff5722', // Secondary color (e.g., orange)
        },
        text: {
        primary: '#333333', // Primary text color
        secondary: '#666666', // Secondary text color
        },
        background: {
        default: '#f0f2f5', // Default background color
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        h2: {
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '2rem',
            fontWeight: 400,
        },
        h3: {
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.5rem',
            fontWeight: 300,
        },
        body1: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1rem',
        }
    }});

export default appTheme;
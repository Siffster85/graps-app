import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTimeOut = (error: AxiosError | null) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (error && error.response?.status === 401) {
        localStorage.clear();
        navigate('/'); // Replace '/login' with your desired landing page
        }
    }, [error, navigate]);
};

import React, { useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

export default function Welcome() {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        return () => clearTimeout(timer);
    }, [])};

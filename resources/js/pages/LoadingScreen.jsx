import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2000); // 2 seconds
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="loader mb-4" />
            <h2 className="text-xl font-semibold">Loading...</h2>
            <style>{`
                .loader {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid #6366f1;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

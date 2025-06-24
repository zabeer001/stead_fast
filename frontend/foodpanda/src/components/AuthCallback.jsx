import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthCallback() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setMessage('No token found');
                console.log('No token found');
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('Response:', data);

                if (response.ok) {
                    setUser(data);
                    setMessage('Authenticated successfully');

                    // Get the token from localStorage
                    const token = localStorage.getItem('token');

                    // Redirect to frontend domain with token as query param
                    const redirectUrl = `http://localhost:5173/dashboard?token=${encodeURIComponent(token)}`;

                    window.location.href = redirectUrl;
                } else {
                    setMessage(data.message || 'Authentication failed');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('Error: ' + error.message);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="App">
            <h1>Login...</h1>
            {message && <p>{message}</p>}
            {user && (
                <pre>{JSON.stringify(user, null, 2)}</pre>
            )}
        </div>
    );
}

export default AuthCallback;

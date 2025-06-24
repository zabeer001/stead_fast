import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // 🔁 Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, []);

    const handleSubmit = async (e, endpoint = '/api/login', extraData = {}) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    ...extraData,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage('Login successful!');
                navigate('/dashboard');
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };


    // const handleFoodpandaLogin = async () => {
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8001/api/authCallBack?redirect_url='http://localhost:5174'`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             localStorage.setItem('foodpanda_token', data.token);
    //             setMessage('Foodpanda login successful!');
    //             navigate('/dashboard');
    //         } else {
    //             setMessage(data.message || 'Foodpanda login failed');
    //         }
    //     } catch (error) {
    //         setMessage('An error occurred: ' + error.message);
    //     }
    // };

     const handleFoodpandaLogin = () => {
        // You can customize this with real redirect/callback values
        const redirectUrl = encodeURIComponent('http://localhost:5174/auth/callback');
        window.location.href = `http://localhost:5174/auth/callback`;
    };


    return (
        <div className="Login">
            <h2>Login Page</h2>
            <form>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                    Log In
                </button>
                <br /><br />
                {/* Optional: Foodpanda button here */}
            </form>
            {message && <p>{message}</p>}

            {/* <button onClick={handleFoodpandaLogin}>Login with Foodpanda</button> */}
 <button type="button" onClick={handleFoodpandaLogin}>
                    Login with Foodpanda
                </button>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitted:', { email, password });

        // return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            console.log(data.token);


            if (response.ok) {

                // store the token
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

    const handleEcommerceLogin = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_2}/api/authCallBack`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('foodpanda_token', data.token);
                setMessage('Foodpanda login successful!');
                navigate('/dashboard');
            } else {
                setMessage(data.message || 'Foodpanda login failed');
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };



    return (
        <div className="Login">
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
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
                <br />
                <button type="submit">Log In</button>
            </form>
            {message && <p>{message}</p>}

            <button onClick={handleEcommerceLogin}>Login with Ecommerce</button>
        </div>
    );
}

export default Login;

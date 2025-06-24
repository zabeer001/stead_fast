import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          return { valid: false };
        }

        const data = await response.json();

        return {
          valid: response.ok && data.success,
          data: data.data,
          message: data.message,
        };
      } catch {
        return { valid: false };
      }
    };

    const fetchUser = async () => {
      // 1. Try token from localStorage
      let token = localStorage.getItem('token');
      let validation = { valid: false };

      if (token) {
        validation = await validateToken(token);
      }

      // 2. If localStorage token invalid or missing, try URL token
      if (!validation.valid) {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('token');

        if (urlToken) {
          validation = await validateToken(urlToken);
          if (validation.valid) {
            localStorage.setItem('token', urlToken);
            token = urlToken;
          }
        }
      }

      // 3. If still invalid token, redirect to login
      if (!validation.valid) {
        localStorage.removeItem('token');
        setMessage('No valid token found, please login.');
        navigate('/login');
        return;
      }

      // 4. If valid, set user data
      setUser(validation.data);
      setMessage(validation.message || 'Welcome back!');
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <p>{message || 'Loading...'}</p>;
  }


const handleLogout = async () => {
  // Try token from localStorage
  let token = localStorage.getItem('token');

  // If no token in localStorage, try URL query param
  if (!token) {
    const params = new URLSearchParams(window.location.search);
    token = params.get('token');
  }

  if (token) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
  }

  // Clean up localStorage and redirect
  localStorage.removeItem('token');
  navigate('/login');
};


  return (
    <div className="Dashboard">
      <h1>Ecommerce dashboard</h1>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

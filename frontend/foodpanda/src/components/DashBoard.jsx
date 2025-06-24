import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setMessage('No token found, please login.');
        navigate('/login'); 
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          // Token invalid or expired
          localStorage.removeItem('token'); // clear invalid token
          navigate('/login'); // redirect to login page
          return;
        }

        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.data);
          setMessage(data.message);
        } else {
          setMessage(data.message || 'Failed to fetch user details.');
        }
      } catch (error) {
        setMessage('An error occurred: ' + error.message);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>{message || 'Loading...'}</p>;
  }


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');  // remove token
    navigate('/login');                // redirect to login page
  };

  return (
    <div className="Dashboard">
      <h1>foodpanda</h1>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

       <button onClick={handleLogout}>Logout</button>
    
    </div>
  );
}

export default Dashboard;

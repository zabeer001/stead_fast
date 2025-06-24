// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>The Ecommerce App</h1>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default Home;

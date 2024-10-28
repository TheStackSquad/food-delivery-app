// src/Pages/Home.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
//import Pizza from '../asset/img/pizza-food.webp';
import '../css/home.css';

function Home() {
  const navigate = useNavigate(); // Initialize navigate function for routing

  return (
    <div className='home'>

      {/* Button Section */}
      <div className='button-section'>
        <Button
          className='custom-btn btn-1'
          variant="none"
          onClick={() => navigate('/menu')} // Navigate to Menu page on click
        >
          Skip
        </Button>
        <Button
          className='custom-btn btn-2'
          variant="outline-secondary"
          onClick={() => navigate('/account')} // Navigate to Account page on click
        >
          Start With Email or Phone
        </Button>
      </div>

    </div>
  );
}

export default Home;

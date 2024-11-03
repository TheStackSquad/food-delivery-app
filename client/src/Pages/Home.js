// src/Pages/Home.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import FlashText from '../components/FlashText';
import texts from '../asset/textData/text';
import '../css/home.css';

function Home() {
  const navigate = useNavigate(); // Initialize navigate function for routing

  return (
    <div className='home'>

<FlashText texts={texts} />

      {/* Button Section */}
      <div className='button-section'>
        <Button
          className='custom-button btn-1'
          variant="none"
          onClick={() => navigate('/menu')} // Navigate to Menu page on click
        >
          Skip
        </Button>
        <Button
          className='custom-button btn-2'
          variant="outline-secondary"
          onClick={() => navigate('/account')} // Navigate to Account page on click
        >
          Login Here
        </Button>
      </div>

    </div>
  );
}

export default Home;

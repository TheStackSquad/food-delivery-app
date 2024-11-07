// src/Pages/Home.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FlashText from '../components/FlashText';
import texts from '../asset/textData/text';
import SlideNav from '../components/slideNav';
import '../css/home.css';
import '../css/slideNav.css';

function Home() {
  const navigate = useNavigate(); // Initialize navigate function for routing
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderCardContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <div className="button-section">
            <Button
              className="custom-button btn-1"
              variant="none"
              onClick={() => navigate('/menu')}
            >
              Skip
            </Button>
            <Button
              className="custom-button btn-2"
              variant="outline-secondary"
              onClick={() => navigate('/login')}
            >
              Login Here
            </Button>
            <p className="card-content">Login to get 15% off your order</p>
          </div>
        );
      case 1:
        return (
          <div className="button-section">
            <Button
              className="custom-button btn-2"
              variant="outline-secondary"
              onClick={() => navigate('/vendor')}
            >
              Find Out More
            </Button>
            <p className="card-content">Accelerate your growth with effortless menu and order management,
              multi-branch support, streamlined team coordination,
              easy payouts, and so much more.</p>
          </div>
        );
      case 2:
        return (
          <div className="button-section">
            <Button
              className="custom-button btn-1"
              variant="none"
              onClick={() => navigate('/rider')}
            >
              Join Us
            </Button>
            <p className="card-content">
          Set your own hours, ride your favorite bike,
          track your progress, earn bonuses,
          and enjoy instant payouts straight to your account!
        </p>;
          </div>
        );
      default:
        return <p className="card-content">Please select an item.</p>;
    }
  };

  return (
    <div className="home">
      <FlashText texts={texts} />

      <div>
        <SlideNav setSelectedIndex={setSelectedIndex} />
        <div className="card-container">
          {renderCardContent()}
        </div>
      </div>
    </div>
  );
}

export default Home;

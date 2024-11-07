// components/slideNav.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { NavbarSlide } from '../animations/navbarSlide';
import '../css/navbarSlide.css';
//import '../css/slideNav.css';

const SlideNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Track the selected index
  const navigate = useNavigate(); // Initialize navigate function for routing

  // Handle item click
  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  // Render card content based on selectedIndex
  const renderCardContent = () => {
    switch (selectedIndex) {
      case 0:
        return (
          <div className="button-section">
             <div className="button-box">
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
            </div>
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
            <p className="card-content">
              Accelerate your growth with effortless menu and order management,
              multi-branch support, streamlined team coordination,
              easy payouts, and so much more.
            </p>
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
            </p>
          </div>
        );
      default:
        return <p className="card-content">Please select an item.</p>;
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <button className="navbar-item" onClick={() => handleItemClick(0)}>Customer</button>
        <button className="navbar-item" onClick={() => handleItemClick(1)}>Vendor</button>
        <button className="navbar-item" onClick={() => handleItemClick(2)}>Rider</button>
      </nav>
      <NavbarSlide selectedIndex={selectedIndex} /> {/* Animated background */}
      <div className="card-container">
        {renderCardContent()}
      </div>
    </div>
  );
};

export default SlideNav;

// components/slideNav.js
import React, { useState } from 'react';
import { NavbarSlide } from '../animations/navbarSlide';
import '../css/navbarSlide.css';

const SlideNav = ({ setSelectedIndex }) => {
  const [selectedIndexState, setSelectedIndexState] = useState(0); // Track the selected index

  // Handle item click
  const handleItemClick = (index) => {
    setSelectedIndexState(index);
    setSelectedIndex(index);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <button className="navbar-item"
        onClick={() => handleItemClick(0)}>Customer</button>

        <button className="navbar-item"
        onClick={() => handleItemClick(1)}>Vendor</button>

        <button className="navbar-item"
        onClick={() => handleItemClick(2)}>Rider</button>
      </nav>
      <NavbarSlide selectedIndex={selectedIndexState} /> {/* Animated background */}
    </div>
  );
};

export default SlideNav;

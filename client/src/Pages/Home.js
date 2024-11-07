// src/Pages/Home.js
import React from 'react';
import FlashText from '../components/FlashText';
import texts from '../asset/textData/text';
import SlideNav from '../components/slideNav';
import '../css/home.css';
import '../css/slideNav.css';

function Home() {
  return (
    <div className="home">
      <FlashText texts={texts} />
      <SlideNav />
    </div>
  );
}

export default Home;

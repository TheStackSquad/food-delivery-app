// src/Pages/Home.js
import React from "react";
import FlashText from "../components/FlashText";
import texts from "../asset/textData/text";
import SlideNav from "../components/slideNav";
import Snap from "../components/Snap";
import  BackgroundImage from '../asset/img/noodles.webp';
import "../css/home.css";
import "../css/slideNav.css";

function Home() {
  return (
    <div className="home">
      <div class="section1">
        <img src={BackgroundImage} alt='backgroundImg' className='HomeImg' />
        <FlashText texts={texts} />
        <SlideNav />
      </div>
      <div class="section2">
        <Snap />
      </div>
    </div>
  );
}

export default Home;

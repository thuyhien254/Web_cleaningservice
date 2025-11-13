import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>
            Get Your Home or Business <br /> Sparkling Clean
          </h1>
          <button className="quote-btn">Get a Quote</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

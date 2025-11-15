import React from "react";
import { Link } from "react-router-dom";  
import "../Section/ServicesSection.css";
import cleaningImg from "../../../assets/house-cleaning.png";
import movingImg from "../../../assets/house-moving.png";

const ServicesSection = () => {
  return (
    <section className="services" id="services">
      <div className="services-header">
        <div>
          <h2>We Always Provide The Best Service</h2>
          <hr />
        </div>
        <div className="services-subtitle">
          <h4>Services</h4>
          <p>
            While we can customize your cleaning plan to suit your needs, most
            clients schedule regular cleaning and moving services:
          </p>
        </div>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <img src={cleaningImg} alt="House Cleaning" />
          <h3>House Cleaning</h3>
          <p>
            We provide flexible cleaning plans to keep your home spotless.
            Regular or one-time — your choice!
          </p>
           <Link to="/house-cleaning" className="readmore-btn">
            Read more →
          </Link>
        </div>

        <div className="service-card">
          <img src={movingImg} alt="House Moving" />
          <h3>House Moving</h3>
          <p>
            Our moving experts make relocating your home stress-free — from
            packing to transportation.
          </p>
          <Link to="/house-moving" className="readmore-btn">
            Read more →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

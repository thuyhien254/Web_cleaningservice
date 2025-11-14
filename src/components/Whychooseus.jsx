import React from "react";
import "./Whychooseus.css";
import teamImg from "../assets/team-group.png";

const WhyChooseUs = () => {
  return (
    <section className="why-section" id="why">
      <div className="why-container">
        <div className="why-text">
          <h2>Why Choose Us?</h2>
          <p className="why-desc">
            Experience the ultimate cleaning service with our dedicated team.
            We provide top-quality, convenient, reliable, and sustainable
            cleaning solutions that exceed your expectations.
          </p>

          <div className="why-grid">
            <div className="why-item">
              <h3>Experience</h3>
              <p>
                With years of experience, our team has the knowledge and
                expertise to tackle any cleaning challenge.
              </p>
            </div>

            <div className="why-item">
              <h3>Quality</h3>
              <p>
                We are committed to providing high-quality cleaning services
                that exceed your expectations.
              </p>
            </div>

            <div className="why-item">
              <h3>Flexibility</h3>
              <p>
                We understand that every home or office has unique cleaning
                needs, and we offer customized solutions to fit your schedule
                and budget.
              </p>
            </div>

            <div className="why-item">
              <h3>Satisfaction</h3>
              <p>
                We take pride in delivering high-quality cleaning services and
                strive to ensure your complete satisfaction with every visit.
              </p>
            </div>
          </div>
        </div>

        <div className="why-image-wrapper">
          <img src={teamImg} alt="Team" className="team-image" />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

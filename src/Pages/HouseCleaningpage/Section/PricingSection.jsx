import React from "react";
import "../Section/PricingSection.css";

const PricingSection = () => {
  return (
    <section className="pricing-wrapper">
      <h2 className="pricing-title">Hourly Cleaning Service Pricing</h2>

      <div className="pricing-cards">

        <div className="pricing-card">
          <h3>2-Hour Package</h3>
          <p className="sub">2 rooms • 55 m²</p>
          <div className="divider"></div>
          <p className="price">132,000đ – 168,000đ</p>
        </div>

        <div className="pricing-card">
          <h3>3-Hour Package</h3>
          <p className="sub">3 rooms • 85 m²</p>
          <div className="divider"></div>
          <p className="price">165,000đ – 210,000đ</p>
        </div>

        <div className="pricing-card">
          <h3>4-Hour Package</h3>
          <p className="sub">4 rooms • 105 m²</p>
          <div className="divider"></div>
          <p className="price">209,000đ – 266,000đ</p>
        </div>

      </div>

      <div className="pricing-notes">
        <div className="note-title">
          <span>Notes</span>
        </div>

        <ul>
          <li>The price list above is for reference only and may vary depending on the time of service.</li>
          <li>Prices may adjust based on area, weekends, peak hours (before 8AM / after 5PM), or holidays.</li>
          <li>If the actual working time is longer than 4 hours, customers are advised to book our General Cleaning Service.</li>
        </ul>
      </div>
    </section>
  );
};

export default PricingSection;

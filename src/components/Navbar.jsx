import React from "react";
import "./Navbar.css";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logoImg} alt="HappyHome Logo" />
        <span className="brand-name">HappyHome</span>
      </div>

      <ul className="nav-links">
        <li><a href="#about">About Us</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>

      <button className="book-btn">Book Schedule</button>
    </nav>
  );
};

export default Navbar;

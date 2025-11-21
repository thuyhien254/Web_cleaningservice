import React, { useState } from "react";
import "../Bookingpage/Booking.css";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    alert("Booking submitted successfully!");
    setFormData({ name: "", email: "", service: "", date: "", time: "" });
  };

  return (
    <div className="booking-page">
      <h1>Book Your Service</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </label>

        <label>
          Service
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="house-cleaning">House Cleaning</option>
            <option value="house-moving">House Moving</option>
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingPage;

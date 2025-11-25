import React, { useEffect, useState } from "react";
import "../AdminBooking/AdminBooking.css";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.data.bookings || []);
      })
      .catch((err) => console.error("Failed to load bookings", err));
  }, []);

  return (
    <div className="booking-admin-page">
      <h1>Booking Management</h1>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Detail</th>
            <th>Assign</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>{b.customer_name}</td>
              <td>{b.phone}</td>

              <td>
                <button className="detail-btn">View</button>
              </td>

              <td>
                <button className="assign-btn">Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooking;

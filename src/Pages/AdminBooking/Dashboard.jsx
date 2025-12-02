import React, { useEffect, useState, useRef } from "react";
import "../AdminBooking/Dashboard.css";

const Dashboard = () => {
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);
const tokenRef = useRef(localStorage.getItem("token"));

useEffect(() => {
  fetch("https://hello-node-render.onrender.com/api/admin/stats/dashboard", {
    headers: { Authorization: `Bearer ${tokenRef.current}` }
  })
    .then((res) => res.json())
    .then((data) => {
      setStats(data.data);
      setLoading(false);
    });
}, []); 

  if (loading || !stats) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  const { summary, charts, recent_activity } = stats;

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">ADMIN DASHBOARD</h2>

      {/* SUMMARY CARDS */}
      <div className="summary-row">
        <div className="summary-card">
          <h3>${summary.total_revenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>

        <div className="summary-card">
          <h3>{summary.total_bookings}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="summary-card">
          <h3>{summary.total_customers}</h3>
          <p>Total Customers</p>
        </div>
      </div>

     {/* STATUS CHART */}
        <div className="chart-box">
        <h3 className="chart-title">Bookings by Status</h3>
        <div className="status-list">
            {charts.by_status.map((item, idx) => (
            <div key={idx} className="status-item">
                <span className="status-label">{item.status}</span>
                <span className="status-count">{item.count}</span>
            </div>
            ))}
        </div>
        </div>

        {/* TOP SERVICE */}
        <div className="chart-box">
        <h3 className="chart-title">Top 5 Services</h3>

        <table className="service-table">
            <thead>
            <tr>
                <th>Service</th>
                <th>Bookings</th>
            </tr>
            </thead>

            <tbody>
            {charts.top_services.map((s, i) => (
                <tr key={i}>
                <td>{s.service.name}</td>
                <td>{s.count}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

      {/* RECENT BOOKINGS */}
      <div className="chart-box">
        <h3 className="chart-title">Recent Bookings</h3>

        <table className="recent-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Status</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recent_activity.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.customer.full_name}</td>
                <td>{b.service.name}</td>
                <td>{b.status}</td>
                <td>{Number(b.total_price).toLocaleString()} đ</td>
                <td>{new Date(b.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;

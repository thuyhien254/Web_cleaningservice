import React, { useEffect, useState } from "react";
import "../AdminBooking/AdminBooking.css";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [assignBooking, setAssignBooking] = useState(null);
  const [availableCleaners, setAvailableCleaners] = useState([]);

  const ROWS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/admin/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setBookings(data?.data?.bookings || []))
      .catch(() => setBookings([]));
  }, []);

  const loadAvailableCleaners = async (bookingId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3000/api/admin/bookings/${bookingId}/available-cleaners`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();
    setAvailableCleaners(data?.data?.available_cleaners || []);
  };

  const totalPages = Math.ceil(bookings.length / ROWS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentRows = bookings.slice(startIndex, startIndex + ROWS_PER_PAGE);
  const emptyRows = Math.max(ROWS_PER_PAGE - currentRows.length, 0);
  const handleAssign = async (cleanerId) => {
    if (!cleanerId) return;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/admin/bookings/assign", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        booking_id: assignBooking.id,
        cleaner_id: cleanerId
      })
    });

    const result = await res.json();

    if (result.success) {
      alert("Assign thành công!");
      window.location.reload();
    } else {
      alert(result.message || "Assign thất bại.");
    }
  };

  const dynamicExcludedFields = [
    "full_name",
    "phone",
    "location",
    "booking_date",
    "booking_time"
  ];

  return (
    <div className="admin-wrapper">
      <h2 className="admin-heading">BOOKING MANAGEMENT</h2>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Detail</th>
              <th>Assign</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((b, index) => (
              <tr key={index}>
                <td>{new Date(b.start_time).toLocaleDateString()}</td>

                <td>
                  {new Date(b.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </td>

                <td>{b.service?.name || "N/A"}</td>
                <td>{b.customer?.full_name || "N/A"}</td>
                <td>{b.customer?.phone || "N/A"}</td>
                <td>{b.status}</td>

                <td>
                  <button className="detail-btn" onClick={() => setDetailData(b)}>
                    View
                  </button>
                </td>

                <td>
                  <button
                    className="assign-btn"
                    onClick={() => {
                      setAssignBooking(b);
                      loadAvailableCleaners(b.id);
                    }}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}

            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array(8)
                  .fill(0)
                  .map((_, idx) => (
                    <td key={idx} className="empty-row"></td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          {"<"}
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          {">"}
        </button>
      </div>

    {detailData && (
  <div className="popup-overlay">
    <div className="popup-box admin-popup">
      <h2>Booking Detail</h2>

      <p><b>Booking ID:</b> {detailData.id}</p>

      <p><b>Name:</b> {detailData.customer?.full_name}</p>
      <p><b>Phone:</b> {detailData.customer?.phone}</p>

      <p><b>Service:</b> {detailData.service?.name}</p>

      <p><b>Start time:</b> {new Date(detailData.start_time).toLocaleString()}</p>
      <p><b>End time:</b> {new Date(detailData.end_time).toLocaleString()}</p>

      <p><b>Location:</b> {detailData.location}</p>
      <p><b>Status:</b> {detailData.status}</p>

      {detailData.booking_data &&
      Object.entries(detailData.booking_data)
    .filter(([key]) => {
      const k = key.trim().toLowerCase();

      const exclude = [
            "full_name",
            "phone",
            "location",
            "start_time",
            "end_time",
            "status",
            "to_address",
            "from_address",
            "booking_date",
            "booking_time"
          ];
          return !exclude.includes(k);
    })
    .map(([key, value]) => (
      <p key={key}>
    <b>{key.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase())}:</b>
      </p>
    ))}

      <button
        className="popup-button close"
        onClick={() => setDetailData(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

      {assignBooking && (
        <div className="popup-overlay">
          <div className="popup-box admin-popup">
            <h2>Assign Cleaner</h2>

            <select
              className="assign-select"
              onChange={(e) => handleAssign(e.target.value)}
            >
              <option value="">-- Select Cleaner --</option>

              {availableCleaners.length === 0 && (
                <option disabled>No cleaner available</option>
              )}

              {availableCleaners.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.phone}
                </option>
              ))}
            </select>

            <button
              className="popup-button close"
              onClick={() => setAssignBooking(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBooking;

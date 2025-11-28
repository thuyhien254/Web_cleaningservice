import React, { useEffect, useState } from "react";
import "../Bookingpage/BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const ROWS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // =============================
  // LOAD DATA
  // =============================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const raw = data?.data;
        const safe = Array.isArray(raw) ? raw : raw?.bookings ?? [];
        setBookings(safe);
      })
      .catch(() => setBookings([]));
  }, []);

  // =============================
  // PAGINATION LOGIC (CHUNG FORMAT)
  // =============================
  const totalPages = Math.ceil(bookings.length / ROWS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentRows = bookings.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const emptyRows = Math.max(ROWS_PER_PAGE - currentRows.length, 0);

  // =============================
  // STATUS TAG
  // =============================
  const statusTag = (status) => {
    const classes = {
      PENDING: "pending",
      CONFIRMED: "assigned",
      COMPLETED: "done",
      CANCELLED: "cancelled"
    };
    return <span className={`status ${classes[status] || "pending"}`}>{status}</span>;
  };

  return (
    <div className="table-wrapper">

      <h2 className="table-heading">BOOKING HISTORY</h2>

      <div className="table-card">
        <table className="main-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Cleaner</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((b, index) => (
              <tr key={index}>
                <td>{new Date(b.start_time).toLocaleDateString()}</td>

                <td>
                  {new Date(b.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td>{b.service?.name || "N/A"}</td>

                <td>{Number(b.total_price || 0).toLocaleString()} đ</td>

                <td>{statusTag(b.status)}</td>

                <td>{b.cleaner?.name || "Not Assigned"}</td>
              </tr>
            ))}

            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array(6)
                  .fill(0)
                  .map((_, c) => (
                    <td key={c} className="empty-row"></td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination same format with Admin */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
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

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
          {">"}
        </button>
      </div>

    </div>
  );
};

export default BookingHistory;

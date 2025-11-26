import React, { useEffect, useState } from "react";
import "../Bookingpage/BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  const ROWS_PER_PAGE = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API HISTORY RESPONSE:", data);
        const safeBookings = data?.data?.bookings ?? [];
        setBookings(safeBookings);
      })
      .catch(() => setBookings([]));
  }, []);

  const statusTag = (status) => {
    switch (status) {
      case "PENDING":
        return <span className="status pending">Pending</span>;
      case "CONFIRMED":
        return <span className="status assigned">Assigned</span>;
      case "COMPLETED":
        return <span className="status done">Done</span>;
      case "CANCELLED":
        return <span className="status cancelled">Cancelled</span>;
      default:
        return <span className="status pending">Pending</span>;
    }
  };

  const totalPages = Math.ceil(bookings.length / ROWS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentRows = bookings.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const emptyRows = Math.max(ROWS_PER_PAGE - currentRows.length, 0);

  return (
    <div className="history-wrapper">
      <h2 className="history-heading">BOOKING HISTORY</h2>

      <div className="table-card">
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Assigned Cleaner</th>
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
                <td>{b.service?.name}</td>
                <td>{Number(b.total_price).toLocaleString()} đ</td>
                <td>{statusTag(b.status)}</td>
                <td>
                  {b.cleaner ? (
                    <span className="assigned-tag">{b.cleaner.name}</span>
                  ) : (
                    <span className="assigned-tag empty">Not Assigned</span>
                  )}
                </td>
              </tr>
            ))}

            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="empty-row"></td>
                <td className="empty-row"></td>
                <td className="empty-row"></td>
                <td className="empty-row"></td>
                <td className="empty-row"></td>
                <td className="empty-row"></td>
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
    </div>
  );
};

export default BookingHistory;

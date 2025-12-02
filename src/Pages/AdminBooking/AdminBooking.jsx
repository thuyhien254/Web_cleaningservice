import React, { useEffect, useState } from "react";
import "../AdminBooking/AdminBooking.css";
import { CiCircleMore } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [detailData, setDetailData] = useState(null);
  const [assignBooking, setAssignBooking] = useState(null);
  const [availableCleaners, setAvailableCleaners] = useState([]);
  const [viewCleaner, setViewCleaner] = useState(null);
  const [search, setSearch] = useState("");

  const ROWS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // LOAD BOOKINGS
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://hello-node-render.onrender.com/api/admin/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data?.data?.bookings ?? []))
      .catch(() => setBookings([]));
  }, []);

  // LOAD AVAILABLE CLEANERS
  const loadAvailableCleaners = async (bookingId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://hello-node-render.onrender.com/api/admin/bookings/${bookingId}/available-cleaners`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    setAvailableCleaners(data?.data || []);
  };

  // UPDATE STATUS
  const updateStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(
        `https://hello-node-render.onrender.com/api/admin/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) return;

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (e) {
      console.error(e);
    }
  };

  // ASSIGN CLEANER (chỉ dùng khi chưa có cleaner)
  const handleAssign = async (cleanerId) => {
    if (!cleanerId) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://hello-node-render.onrender.com/api/admin/bookings/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          booking_id: assignBooking?.id,
          cleaner_id: cleanerId,
        }),
      });

      const result = await res.json();
      if (result.success) window.location.reload();
    } catch (err) {
      console.error("Assign error:", err);
    }
  };

  // GET CLEANER DETAIL
  const fetchCleanerDetail = async (cleanerId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `https://hello-node-render.onrender.com/api/admin/cleaners/${cleanerId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();
    if (data.success) setViewCleaner(data.data);
  };

  // FILTER BOOKINGS
  const filteredBookings = bookings.filter((b) => {
    const customerName =
      b.booking_data?.full_name ||
      b.booking_data?.name ||
      b.customer?.full_name ||
      "";

    return customerName.toLowerCase().includes(search.toLowerCase());
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredBookings.length / ROWS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const currentRows = filteredBookings.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );
  const emptyRows = Math.max(ROWS_PER_PAGE - currentRows.length, 0);

  // STATUS BUTTON COMPONENT
  const StatusButton = ({ b }) => {
    const [open, setOpen] = useState(false);
    const statusList = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

    return (
      <div className="status-dropdown-wrapper">
        <button
          className={`status-tag ${b.status.toLowerCase()}-tag`}
          onClick={() => setOpen(!open)}
        >
          {b.status}
        </button>

        {open && (
          <div className="status-dropdown">
            {statusList.map((s) => (
              <div
                key={s}
                className="dropdown-item"
                onClick={() => {
                  updateStatus(b.id, s);
                  setOpen(false);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      <h2 className="table-heading">BOOKING MANAGEMENT</h2>

      {/* SEARCH BAR */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-input-full"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-card">
        <table className="main-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Service</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Detail</th>
              <th>Assign</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((b) => {
              const showName =
                b.booking_data?.full_name ||
                b.booking_data?.name ||
                b.customer?.full_name;

              return (
                <tr key={b.id}>
                  <td>{new Date(b.start_time).toLocaleDateString()}</td>

                  <td>
                    {new Date(b.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td>{b.service?.name}</td>
                  <td>{showName}</td>

                  <td>{Number(b.total_price || 0).toLocaleString()} đ</td>

                  <td>
                    <StatusButton b={b} />
                  </td>

                  <td>
                    <button className="icon-btn" onClick={() => setDetailData(b)}>
                      <CiCircleMore size={30} />
                    </button>
                  </td>

                  <td>
                    {b.cleaner ? (
                      // 🔵 ĐÃ ASSIGN — KHÔNG CHO ĐỔI NGƯỜI
                      <div className="assign-cell">
                        <span
                          className="assign-name"
                          onClick={() => fetchCleanerDetail(b.cleaner.id)}
                        >
                          {b.cleaner.name}
                        </span>
                      </div>
                    ) : (
                      // 🟢 CHƯA ASSIGN — CHO ASSIGN
                      <div className="assign-center">
                        <FaUserPlus
                          size={14}
                          className="assign-icon"
                          onClick={() => {
                            setAssignBooking(b);
                            loadAvailableCleaners(b.id);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* Empty rows for fixed height */}
            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`}>
                {Array(8)
                  .fill(0)
                  .map((_, c) => (
                    <td className="empty-row" key={c}></td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

      {/* DETAIL POPUP */}
      {detailData && (
        <div className="popup-overlay">
          <div className="booking-detail-box">
            <div className="popup-top-line">
              <span className="popup-booking-id">
                Booking ID: {detailData.id}
              </span>
            </div>

            <h2 className="popup-title-center">BOOKING DETAIL</h2>

            <div className="popup-status-center">
              <span
                className={`status-tag ${detailData.status.toLowerCase()}-tag`}
              >
                {detailData.status}
              </span>
            </div>

            <div className="popup-columns">
              <div className="popup-col">
                <h3 className="section-title-left">Customer Information</h3>

                <div className="info-row">
                  <b>Full name:</b>{" "}
                  {detailData.booking_data?.full_name ||
                    detailData.booking_data?.name}
                </div>
                <div className="info-row">
                  <b>Phone:</b> {detailData.booking_data?.phone}
                </div>
                <div className="info-row">
                  <b>Address:</b> {detailData.booking_data?.address}
                </div>
              </div>

              <div className="popup-col">
                <h3 className="section-title-left">Service Information</h3>

                <div className="info-row">
                  <b>Service:</b> {detailData.service?.name}
                </div>

                <div className="info-row">
                  <b>Start:</b> {new Date(detailData.start_time).toLocaleString()}
                </div>

                <div className="info-row">
                  <b>End:</b> {new Date(detailData.end_time).toLocaleString()}
                </div>

                <div className="info-row">
                  <b>Price:</b>{" "}
                  {Number(detailData.total_price).toLocaleString()} đ
                </div>
              </div>
            </div>

            <button
              className="popup-button close"
              onClick={() => setDetailData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ASSIGN POPUP */}
      {assignBooking && (
        <div className="popup-overlay">
          <div className="assign-box">
            <h2 className="assign-title">Assign Cleaner</h2>

            <div className="assign-list">
              {availableCleaners.length === 0 ? (
                <p className="no-cleaner">No cleaner available</p>
              ) : (
                availableCleaners.map((c) => (
                  <div className="assign-item" key={c.id}>
                    <span className="cleaner-name">{c.name}</span>
                    <button
                      className="choose-btn"
                      onClick={() => handleAssign(c.id)}
                    >
                      Assign
                    </button>
                  </div>
                ))
              )}
            </div>

            <button
              className="popup-button close"
              onClick={() => setAssignBooking(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CLEANER DETAIL POPUP */}
      {viewCleaner && (
        <div className="popup-overlay">
          <div className="popup-box cleaner-info-popup">
            <h2 className="cleaner-title">Cleaner Information</h2>

            <img
              src={
                viewCleaner.avatar ||
                `https://ui-avatars.com/api/?size=200&background=0D8ABC&color=fff&name=${encodeURIComponent(
                  viewCleaner.name
                )}`
              }
              className="cleaner-avatar"
              alt="avatar"
            />

            <p>
              <b>Name:</b> {viewCleaner.name}
            </p>
            <p>
              <b>Phone:</b> {viewCleaner.phone}
            </p>
            <p>
              <b>Email:</b> {viewCleaner.email || "N/A"}
            </p>
            <p>
              <b>Status:</b> {viewCleaner.status}
            </p>

            <button
              className="popup-button close"
              onClick={() => setViewCleaner(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBooking;

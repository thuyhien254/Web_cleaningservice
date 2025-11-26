import React, { useEffect, useState } from "react";
import "../AdminBooking/Employees.css";

const EmployeePage = () => {
  const [cleaners, setCleaners] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  const token = localStorage.getItem("token");

  // =============================
  // LOAD CLEANER LIST
  // =============================
  const loadCleaners = () => {
    fetch("http://localhost:3000/api/admin/cleaners", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCleaners(data?.data || []))
      .catch(() => setCleaners([]));
  };

  useEffect(() => {
    loadCleaners();
  }, []);

  const handleAdd = () => {
    setShowAddPopup(true);
  };

  // =============================
  // CREATE CLEANER + UPLOAD AVATAR
  // =============================
  const handleCreateCleaner = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("phone", e.target.phone.value);
    formData.append("email", e.target.email.value);
    formData.append("status", e.target.status.value);

    if (e.target.avatar.files.length > 0) {
      formData.append("avatar", e.target.avatar.files[0]);
    }

    const res = await fetch("http://localhost:3000/api/admin/cleaners", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
        // ❗ KHÔNG SET Content-Type — Browser tự set boundary
      },
      body: formData
    });

    const result = await res.json();

    if (result.success) {
      alert("Thêm nhân viên thành công!");
      setShowAddPopup(false);
      loadCleaners();
    } else {
      alert(result.message || "Lỗi!");
    }
  };

  // Avatar fallback dùng UI Avatars
  const fallbackAvatar = (name = "User") =>
    `https://ui-avatars.com/api/?size=200&background=0D8ABC&color=fff&name=${encodeURIComponent(
      name
    )}`;

  return (
    <div className="employee-wrapper">
      <h2 className="employee-heading">EMPLOYEE MANAGEMENT</h2>

      <div className="employee-top-row">
        <button className="add-btn" onClick={handleAdd}>
          +
        </button>
      </div>

      <div className="employee-layout">
        {/* ============ LEFT GRID ============ */}
        <div className="employee-grid">
          {cleaners.map((c) => (
            <div
              key={c.id}
              className={`employee-card ${selected?.id === c.id ? "active" : ""}`}
              onClick={() => setSelected(c)}
            >
              <img
                src={c.avatar || fallbackAvatar(c.name)}
                className="employee-avatar"
                alt="avatar"
              />
              <h3>{c.name}</h3>
              <span className={`badge ${c.status.toLowerCase()}`}>{c.status}</span>
            </div>
          ))}
        </div>

        {/* ============ RIGHT DETAIL PANEL ============ */}
        {selected && (
          <div className="employee-detail">
            <h3 className="detail-title">Employee Detail</h3>

            <img
              src={selected.avatar || fallbackAvatar(selected.name)}
              className="detail-avatar"
              alt="avatar"
            />

            <p>
              <b>Name:</b> {selected.name}
            </p>
            <p>
              <b>Phone:</b> {selected.phone}
            </p>
            <p>
              <b>Email:</b> {selected.email || "N/A"}
            </p>
            <p>
              <b>Status:</b> {selected.status}
            </p>

            <button className="detail-close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        )}
      </div>

      {/* ============ POPUP ============ */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-box employee-popup">
            <h2>Add New Employee</h2>

            <form onSubmit={handleCreateCleaner}>
              <label>Name</label>
              <input name="name" required />

              <label>Phone</label>
              <input name="phone" required />

              <label>Email</label>
              <input name="email" placeholder="optional" />

              <label>Avatar (Upload Image)</label>
              <input name="avatar" type="file" accept="image/*" />

              <label>Status</label>
              <select name="status">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="ON_LEAVE">ON_LEAVE</option>
              </select>

              <button type="submit" className="popup-button save">
                Save
              </button>
              <button
                type="button"
                className="popup-button close"
                onClick={() => setShowAddPopup(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePage;

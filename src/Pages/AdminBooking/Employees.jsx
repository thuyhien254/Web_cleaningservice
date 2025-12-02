import React, { useEffect, useState, useCallback } from "react";
import { FaPen } from "react-icons/fa";
import "../AdminBooking/Employees.css";

const EmployeePage = () => {
  const [cleaners, setCleaners] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  // LOAD CLEANERS
  const loadCleaners = useCallback(() => {
    fetch("https://hello-node-render.onrender.com/api/admin/cleaners", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setCleaners(data?.data || []);
        setError(null);
      })
      .catch(() => {
        setError("Không thể tải dữ liệu nhân viên.");
        setCleaners([]);
      });
  }, [token]);

  useEffect(() => {
    loadCleaners();
  }, [loadCleaners]);

  const handleSelectCleaner = (cleaner) => {
    setSelected(cleaner);
    setIsEditing(false);
  };

  // ADD EMPLOYEE
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("phone", e.target.phone.value);
    formData.append("email", e.target.email.value);
    formData.append("status", e.target.status.value);

    if (e.target.avatar.files.length > 0) {
      formData.append("avatar", e.target.avatar.files[0]);
    }

    const res = await fetch("https://hello-node-render.onrender.com/api/admin/cleaners", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const result = await res.json();

    if (result.success) {
      setShowAddPopup(false);
      loadCleaners();
    } else {
      alert(result.message || "Lỗi!");
    }
  };

  const handleEdit = () => setIsEditing(true);

  // ONLY UPDATE STATUS
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    const newStatus = e.target.status.value;

    const res = await fetch(
      `https://hello-node-render.onrender.com/api/admin/cleaners/${selected.id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      }
    );

    const result = await res.json();

    if (result.success) {
      alert("Cập nhật trạng thái thành công!");
      loadCleaners();
      setIsEditing(false);
      setSelected((prev) => ({ ...prev, status: newStatus }));
    } else {
      alert(result.message || "Lỗi khi cập nhật trạng thái!");
    }
  };

  const fallbackAvatar = (name = "User") =>
    `https://ui-avatars.com/api/?size=200&background=0D8ABC&color=fff&name=${encodeURIComponent(
      name
    )}`;

  return (
    <div className="employee-wrapper">
      <h2 className="employee-heading">EMPLOYEE MANAGEMENT</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="employee-top-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="add-btn" onClick={() => setShowAddPopup(true)}>
          + Add
        </button>
      </div>

      {/* ADD POPUP */}
      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2 className="popup-title">Add Employee</h2>

            <form onSubmit={handleAddEmployee} className="popup-form">
              <div className="popup-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" required placeholder="Enter name" />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" name="phone" required placeholder="Enter phone" />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" defaultValue="ACTIVE">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="ON_LEAVE">On Leave</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Avatar</label>
                  <input type="file" name="avatar" accept="image/*" />
                </div>
              </div>

              <div className="popup-buttons">
                <button type="submit" className="btn-save">Add</button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="employee-layout">
        {/* GRID LIST */}
        <div className="employee-grid">
          {cleaners
            .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((c) => (
              <div
                key={c.id}
                className={`employee-card ${selected?.id === c.id ? "active" : ""}`}
                onClick={() => handleSelectCleaner(c)}
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

        {/* DETAIL PANEL */}
        {selected && (
          <div className="employee-detail">
            <h3 className="detail-title">Employee Detail</h3>

            <img
              src={selected.avatar || fallbackAvatar(selected.name)}
              className="detail-avatar"
              alt="avatar"
            />

            {isEditing ? (
              <form onSubmit={handleUpdateStatus}>
                <label>Status</label>
                <select name="status" defaultValue={selected.status}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ON_LEAVE">ON_LEAVE</option>
                </select>

                <button type="submit" className="popup-button save">
                  Update Status
                </button>
              </form>
            ) : (
              <div>
                <p><b>Name:</b> {selected.name}</p>
                <p><b>Phone:</b> {selected.phone}</p>
                <p><b>Email:</b> {selected.email}</p>
                <p><b>Status:</b> {selected.status}</p>

                <button className="edit-btn" onClick={handleEdit}>
                  <FaPen />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePage;

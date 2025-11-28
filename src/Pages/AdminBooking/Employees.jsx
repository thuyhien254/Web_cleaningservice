import React, { useEffect, useState, useCallback } from "react";
import { FaPen } from "react-icons/fa";
import "../AdminBooking/Employees.css";

const EmployeePage = () => {
  const [cleaners, setCleaners] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // LOAD CLEANERS 
 const loadCleaners = useCallback(() => {
  fetch("http://localhost:3000/api/admin/cleaners", {
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

  // Gọi khi component mount
 useEffect(() => {
  loadCleaners();
}, [loadCleaners]);

  // HANDLE SELECT
  const handleSelectCleaner = (cleaner) => {
    setSelected(cleaner);
    setIsEditing(false);
  };

  // EDIT MODE
  const handleEdit = () => {
    setIsEditing(true);
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.name.value);
    formData.append("phone", e.target.phone.value);
    formData.append("email", e.target.email.value);
    formData.append("status", e.target.status.value);

    if (e.target.avatar.files.length > 0) {
      formData.append("avatar", e.target.avatar.files[0]);
    }

    const res = await fetch(
      `http://localhost:3000/api/admin/cleaners/${selected.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );

    const result = await res.json();

    if (result.success) {
      alert("Cập nhật thông tin nhân viên thành công!");
      loadCleaners();
      setIsEditing(false);

      // Cập nhật lại selected cleaner
      setSelected((prev) => ({
        ...prev,
        ...result.data
      }));
    } else {
      alert(result.message || "Lỗi!");
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
          <button className="add-btn">+</button>
        </div>

      <div className="employee-layout">
        {/* GRID LIST */}
        <div className="employee-grid">
          {cleaners.map((c) => (
            <div
              key={c.id}
              className={`employee-card ${
                selected?.id === c.id ? "active" : ""
              }`}
              onClick={() => handleSelectCleaner(c)}
            >
              <img
                src={c.avatar || fallbackAvatar(c.name)}
                className="employee-avatar"
                alt="avatar"
              />
              <h3>{c.name}</h3>
              <span className={`badge ${c.status.toLowerCase()}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>

        {/* DETAIL BOX */}
        {selected && (
          <div className="employee-detail">
            <h3 className="detail-title">Employee Detail</h3>

            <img
              src={selected.avatar || fallbackAvatar(selected.name)}
              className="detail-avatar"
              alt="avatar"
            />

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input name="name" defaultValue={selected.name} required />

                <label>Phone</label>
                <input name="phone" defaultValue={selected.phone} required />

                <label>Email</label>
                <input name="email" defaultValue={selected.email} />

                <label>Status</label>
                <select name="status" defaultValue={selected.status}>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="ON_LEAVE">ON_LEAVE</option>
                </select>

                <label>Avatar (Upload Image)</label>
                <input name="avatar" type="file" accept="image/*" />

                <button type="submit" className="popup-button save">
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <p>
                  <b>Name:</b> {selected.name}
                </p>
                <p>
                  <b>Phone:</b> {selected.phone}
                </p>
                <p>
                  <b>Email:</b> {selected.email}
                </p>
                <p>
                  <b>Status:</b> {selected.status}
                </p>

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

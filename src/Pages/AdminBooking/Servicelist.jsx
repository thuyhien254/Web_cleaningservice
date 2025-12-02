import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminBooking/Servicelist.css";

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
  fetch("https://hello-node-render.onrender.com/api/admin/services", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("SERVICE API RESPONSE:", data); // Debug xem output thực tế

      // ÉP VỀ ARRAY CHẮC CHẮN
      const list = Array.isArray(data?.data) ? data.data : [];

      setServices(list);
    })
    .catch(() => setError("Không thể tải danh sách dịch vụ"));
}, [token]);


  const fallbackIcon =
    "https://cdn-icons-png.flaticon.com/512/1048/1048953.png";

  return (
    <div className="service-wrapper">
      <div className="service-header">
        <h2>SERVICE MANAGEMENT</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/admin/service/create")}
        >
          + Create Service
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="service-grid">
        {services.map((s) => (
          <div key={s.id} className="service-card">
            <img
              src={s.image || fallbackIcon}
              alt="service"
              className="service-img"
            />

            <div className="service-info">
              <h3>{s.name}</h3>
              <p className="desc">{s.description || "No description"}</p>
              <span className="price">${s.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;

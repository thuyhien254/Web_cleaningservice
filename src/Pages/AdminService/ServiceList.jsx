import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaEdit,FaPlus,FaPowerOff,FaBoxOpen,FaChevronDown,} from "react-icons/fa";
import "./ServiceList.css";

const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  // FETCH SERVICES
  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let url = "https://hello-node-render.onrender.com/api/admin/services";
      if (filterStatus) url += `?status=${filterStatus}`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        const list =
          data.data?.services ||
          (Array.isArray(data.data) ? data.data : []);
        setServices(list);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [filterStatus]);

  // TOGGLE STATUS
  const handleToggleStatus = async (serviceId, currentStatus) => {
    const actionName = currentStatus ? "disable" : "enable";
    if (
      !window.confirm(
        `Are you sure you want to ${actionName} this service?`
      )
    )
      return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://hello-node-render.onrender.com/api/admin/services/${serviceId}/toggle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      if (result.success) {
        setServices((prev) =>
          prev.map((svc) =>
            (svc.id || svc._id) === serviceId
              ? { ...svc, is_active: !svc.is_active }
              : svc
          )
        );
      } else {
        alert(result.message || "Unable to update service");
      }
    } catch {
      alert("Server connection error");
    }
  };

  const formatCurrency = (v) =>
    v ? v.toLocaleString("en-US") + " ₫" : "0 ₫";

  return (
    <div className="table-wrapper">
      {/* PAGE HEADER */}
      <h2 className="table-heading">SERVICE MANAGEMENT</h2>

      {/* FILTER + BUTTON */}
      <div className="search-bar-wrapper service-header-actions">
        <div className="filter-wrapper">
          <select
            className="custom-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="dropdown-arrow">
            <FaChevronDown />
          </div>
        </div>

        <button
          className="btn-primary add-service-btn"
          onClick={() => navigate("/admin/services/create")}
        >
          <FaPlus size={12} style={{ marginRight: 6 }} /> Add Service
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <span>Loading services...</span>
          </div>
        ) : (
          <table className="main-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Base Price</th>
                <th>Duration</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div className="empty-state">
                      <FaBoxOpen size={40} />
                      <p>No services found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                services.map((service) => {
                  const sId = service.id || service._id;

                  return (
                    <tr key={sId}>
                      <td>
                        <div className="service-name">{service.name}</div>
                        <div className="service-id">ID: {sId}</div>
                      </td>

                      <td className="price-cell">
                        {formatCurrency(service.base_price)}
                      </td>

                      <td>
                        <span className="duration-badge">
                          {service.duration_minutes} minutes
                        </span>
                      </td>

                      <td>
                        <div
                          className={`status-badge ${
                            service.is_active ? "active" : "inactive"
                          }`}
                        >
                          <span className="status-dot"></span>
                          {service.is_active ? "Active" : "Inactive"}
                        </div>
                      </td>

                      <td className="text-right">
                        <div className="action-group">
                          <button
                            className="btn-icon btn-edit"
                            onClick={() =>
                              navigate(`/admin/services/${sId}/builder`)
                            }
                            title="Edit service"
                          >
                            <FaEdit />
                          </button>

                          <button
                            className={`btn-icon ${
                              service.is_active ? "btn-off" : "btn-on"
                            }`}
                            onClick={() =>
                              handleToggleStatus(
                                sId,
                                service.is_active
                              )
                            }
                            title={
                              service.is_active ? "Disable" : "Enable"
                            }
                          >
                            <FaPowerOff />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ServiceList;

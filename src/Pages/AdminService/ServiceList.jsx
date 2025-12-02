import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Thêm FaChevronDown vào import
import { FaEdit, FaPlus, FaFilter, FaPowerOff, FaBoxOpen, FaChevronDown } from "react-icons/fa";
import "./ServiceList.css";

const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");

  // --- LOGIC FETCH DATA (GIỮ NGUYÊN) ---
  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let url = "https://hello-node-render.onrender.com/api/admin/services";
      if (filterStatus) {
        url += `?status=${filterStatus}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        const list = data.data?.services || (Array.isArray(data.data) ? data.data : []);
        setServices(list);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [filterStatus]);

  // --- LOGIC TOGGLE STATUS (GIỮ NGUYÊN) ---
  const handleToggleStatus = async (serviceId, currentStatus) => {
    const actionName = currentStatus ? "ẩn (tắt)" : "hiện (bật)";
    if (!window.confirm(`Bạn có chắc muốn ${actionName} dịch vụ này không?`)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://hello-node-render.onrender.com/api/admin/services/${serviceId}/toggle`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.success) {
        setServices((prev) =>
          prev.map((svc) => {
            const currentId = svc.id || svc._id;
            if (currentId === serviceId) return { ...svc, is_active: !svc.is_active };
            return svc;
          })
        );
      } else {
        alert(`Lỗi: ${result.message || "Không thể cập nhật"}`);
      }
    } catch (err) {
      alert("Lỗi kết nối server");
    }
  };

  const formatCurrency = (val) => {
    return val ? val.toLocaleString("vi-VN") + " ₫" : "0 ₫";
  };

  return (
    <div className="page-container">
      <div className="card">
        {/* HEADER */}
        <div className="card-header">
          <div className="header-content">
            <h2 className="title">Quản lý Dịch vụ</h2>
            <p className="subtitle">Danh sách dịch vụ trên hệ thống HappyHome</p>
          </div>

          <div className="header-actions">
            {/* --- PHẦN FILTER ĐƯỢC SỬA --- */}
            <div className="filter-wrapper">
              
              <select
                className="custom-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Đã ẩn</option>
              </select>

              {/* --- BỌC CLASS MỚI CHO ICON TẠI ĐÂY --- */}
              <div className="dropdown-arrow">
                <FaChevronDown />
              </div>
            </div>
            {/* ----------------------------- */}

            <button
              className="btn-primary"
              onClick={() => navigate("/admin/services/create")}
            >
              <FaPlus size={12} style={{ marginRight: 6 }} />
              Thêm mới
            </button>
          </div>
        </div>

        {/* TABLE (GIỮ NGUYÊN) */}
        <div className="table-responsive">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th>Giá cơ bản</th>
                  <th>Thời lượng</th>
                  <th>Trạng thái</th>
                  <th className="text-right">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <FaBoxOpen size={40} />
                        <p>Chưa có dữ liệu dịch vụ nào.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  services.map((service) => {
                    const sId = service.id || service._id;
                    return (
                      <tr key={sId} className="table-row">
                        <td>
                          <div className="service-name">{service.name}</div>
                          <div className="service-id">ID: {sId}</div>
                        </td>
                        <td className="price-cell">
                          {formatCurrency(service.base_price)}
                        </td>
                        <td>
                          <span className="duration-badge">
                            {service.duration_minutes} phút
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
                              onClick={() => navigate(`/admin/services/${sId}/builder`)}
                              title="Chỉnh sửa"
                            >
                              <FaEdit />
                            </button>

                            <button
                              className={`btn-icon ${
                                service.is_active ? "btn-off" : "btn-on"
                              }`}
                              onClick={() => handleToggleStatus(sId, service.is_active)}
                              title={service.is_active ? "Ẩn dịch vụ" : "Hiện dịch vụ"}
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
    </div>
  );
};

export default ServiceList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Bookingpage/Booking.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState({ show: false, message: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data.data.services || []));
  }, []);

  const handleServiceChange = async (serviceId) => {
    if (!serviceId) return;

    const res = await fetch(`http://localhost:3000/api/services/${serviceId}`);
    const data = await res.json();
    const svc = data.data.service;

    setSelectedService(svc);

    const bookingBlock = svc.layout_config?.find(
      (block) => block.type === "booking"
    );

    if (bookingBlock?.data?.form_schema) {
      const fixedFields = bookingBlock.data.form_schema.map((f) => ({
        ...f,
        field_type: f.field_type || f["field _type"] || "text",
      }));
      setFields(fixedFields);
    } else {
      setFields([]);
    }

    setFormValues({});
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setErrorPopup({ show: true, message: "Bạn cần đăng nhập trước!" });
      return;
    }

    const startTime = new Date(
      `${formValues.booking_date}T${formValues.booking_time}:00`
    ).toISOString();

    const location =
      formValues.address ||
      formValues.from_address ||
      formValues.to_address ||
      "";

    const payload = {
      service_id: selectedService.id,
      start_time: startTime,
      location: location,
      booking_data: formValues,
    };

    const response = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      setSuccessPopup(true); 
    } else {
      setErrorPopup({
        show: true,
        message: result.message || "Có lỗi xảy ra!",
      });
    }
  };

      return (
    <div className="booking-page">

      {successPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon success">✔</div>
            <h2>Booking created successfully!</h2>

            <button
              className="popup-button success"
              onClick={() => navigate("/booking-history")}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {errorPopup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-icon error">✖</div>
            <h2>Booking Failed</h2>
            <p style={{ marginTop: "10px", color: "#444" }}>
              {errorPopup.message}
            </p>

            <button
              className="popup-button error"
              onClick={() => setErrorPopup({ show: false, message: "" })}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1 className="booking-page-title">Booking Schedule</h1>

      <select
        className="service-select"
        onChange={(e) => handleServiceChange(e.target.value)}
      >
        <option value="">-- Select service --</option>
        {services.map((svc) => (
          <option key={svc.id} value={svc.id}>
            {svc.name}
          </option>
        ))}
      </select>

      {fields.length > 0 && (
        <form className="booking-form" onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div key={f.field_name} className="form-group">
              <label>{f.label}</label>

              {f.field_type === "select" ? (
                <select
                  name={f.field_name}
                  required={f.required}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select --</option>
                  {(f.options || []).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.field_type}
                  name={f.field_name}
                  required={f.required}
                  value={formValues[f.field_name] || ""}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}

          <button className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;

import React, { useEffect, useState } from "react";
import "../Bookingpage/Booking.css";

const BookingPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [fields, setFields] = useState([]);

  // Fetch danh sách dịch vụ
  useEffect(() => {
    fetch("http://localhost:3000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data.services || []);
      })
      .catch((err) => console.error("Failed to load services", err));
  }, []);

  const handleServiceChange = (serviceId) => {
    const svc = services.find((s) => s.id === Number(serviceId));
    setSelectedService(svc);

    if (svc?.booking_form_config?.fields) {
      setFields(svc.booking_form_config.fields);
    } else {
      setFields([]);
    }
  };

  return (
    <div className="booking-page">
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
        <form className="booking-form">
          {fields.map((f) => (
            <div key={f.key} className="form-group">
              <label>{f.label}</label>

              <input
                type={f.type}
                name={f.key}
                required={f.required}
                placeholder={f.placeholder || ""}
              />
            </div>
          ))}

          <button className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;

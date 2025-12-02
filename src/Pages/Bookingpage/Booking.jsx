import React, { useEffect, useState } from "react";
import "../Bookingpage/Booking.css";

const BookingPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);

  const [successPopup, setSuccessPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState({ show: false, message: "" });

  // LOAD SERVICES
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://hello-node-render.onrender.com/api/services", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setServices(data?.data?.services ?? []))
      .catch(() => setServices([]));
  }, []);

  // WHEN CHOOSE SERVICE
  const handleServiceChange = async (serviceId) => {
    if (!serviceId) return;

    const res = await fetch(`https://hello-node-render.onrender.com/api/services/${serviceId}`);
    const data = await res.json();
    const svc = data.data.service;

    setSelectedService(svc);
    setSelectedSubService(null);

    const pricingBlock = svc.layout_config?.find((b) => b.type === "pricing");

   if (pricingBlock && Array.isArray(pricingBlock.data?.subservices)) {
        setSelectedPrice(svc.base_price);
      } else {
        setSelectedPrice(svc.base_price);
      }

    const bookingBlock = svc.layout_config?.find((block) => block.type === "booking");
    if (bookingBlock?.data?.form_schema) {
      const fieldOrder = [
        "name",
        "address",
        "phone_number", 
        "phone",       
        "subservice_id",    
        "booking_date",   
        "booking_time"      
      ];

      let formFields = [...bookingBlock.data.form_schema];

      const maxIndex = fieldOrder.length + 10;
      formFields.sort((a, b) => {
        const ai = fieldOrder.indexOf(a.field_name);
        const bi = fieldOrder.indexOf(b.field_name);
        return (ai === -1 ? maxIndex : ai) - (bi === -1 ? maxIndex : bi);
      });

      setFields(formFields);
    } else {
      setFields([]);
    }

    setFormValues({});
  };

  // WHEN SELECT SUBSERVICE
  const handleSubServiceChange = (subserviceId) => {
    if (!selectedService) return;

    const pricingBlock = selectedService.layout_config?.find((b) => b.type === "pricing");
    const found = pricingBlock?.data?.subservices?.find((s) => s.id === subserviceId);
    if (found) {
      setSelectedSubService(found);
      setSelectedPrice(found.price);
    } else {
      setSelectedSubService(null);
      setSelectedPrice(selectedService.base_price || null);
    }
    setFormValues((prev) => ({ ...prev, subservice_id: subserviceId }));
  };

  // CHANGE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorPopup({ show: true, message: "Bạn cần đăng nhập trước!" });
      return;
    }

    const startTime = new Date(
      `${formValues.booking_date}T${formValues.booking_time || "00:00"}:00`
    ).toISOString();

    const location =
      formValues.address ||
      formValues.from_address ||
      formValues.to_address ||
      "";

    const payload = {
      service_id: selectedService.id,
      subservice_id: selectedSubService?.id || formValues.subservice_id, 
      start_time: startTime,
      location: location,
      booking_data: formValues,
      total_price: selectedPrice,
    };

    console.log("Payload gửi đi:", payload);

    const response = await fetch("https://hello-node-render.onrender.com/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Response từ server:", result);

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
              onClick={() => setSuccessPopup(false)}
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

      {/* SERVICE SELECT*/}
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
          {fields.map((f) => {
            // Render special UI for subservice_id (select package)
            if (f.field_name === "subservice_id") {
              const pricingBlock = selectedService?.layout_config?.find((b) => b.type === "pricing");
              const subservices = pricingBlock?.data?.subservices || [];

              return (
                <div key={f.field_name} className="form-group">
                  <label>{f.label || "-- Select package --"}</label>
                  <select
                    name="subservice_id"
                    value={formValues.subservice_id || ""}
                    required={f.required}
                    onChange={(e) => handleSubServiceChange(e.target.value)}
                  >
                    <option value="">-- Select package --</option>
                    {subservices.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.subservice_title} {sub.price ? ` - ${sub.price}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // Generic select type fields
            if (f.field_type === "select") {
              return (
                <div key={f.field_name} className="form-group">
                  <label>{f.label}</label>
                  <select
                    name={f.field_name}
                    required={f.required}
                    value={formValues[f.field_name] || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Select --</option>
                    {(f.options || []).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // default input
            return (
              <div key={f.field_name} className="form-group">
                <label>{f.label}</label>
                <input
                  type={f.field_type || "text"}
                  name={f.field_name}
                  required={f.required}
                  value={formValues[f.field_name] || ""}
                  onChange={handleInputChange}
                />
              </div>
            );
          })}

          {/* Price placed under form */}
          {selectedPrice !== null && (
            <div className="price-section">
              <div className="price-label">Price:</div>
              <div className="price-value">{selectedPrice}</div>
              <div className="price-currency">VND</div>
            </div>
          )}

          <button className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;

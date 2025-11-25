import "../ServiceBlock/PricingSection.css";

const PricingSection = ({ data }) => {
  return (
    <section className="pricing-wrapper">

      {/* Title */}
      <h2 className="pricing-title">
        {data?.service_title || "Pricing"}
      </h2>

      {/* Cards */}
      <div className="pricing-cards">
        {Array.isArray(data?.subservices) &&
          data.subservices.map((item, index) => (
            <div className="pricing-card" key={index}>
              <h3>{item.subservice_title}</h3>

              <div className="divider"></div>

              <p className="price">
                {item.price.toLocaleString("vi-VN")}đ
              </p>
            </div>
          ))
        }
      </div>

      {/* Notes */}
      {data?.note && (
        <div className="pricing-notes">
          <div className="note-title">
            <span>Notes</span>
          </div>

          <ul>
            <li>{data.note}</li>
          </ul>
        </div>
      )}

    </section>
  );
};

export default PricingSection;

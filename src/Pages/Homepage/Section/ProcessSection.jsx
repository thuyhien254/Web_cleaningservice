import "../Section/ProcessSection.css";
import { Link } from "react-router-dom";
import calendarImg from "../../../assets/process-calendar.png";
import cleaningImg from "../../../assets/process-cleaning.png";
import paymentImg from "../../../assets/process-payment.png";
import arrowImg from "../../../assets/arrow-right.png";

const ProcessSection = () => {
  return (
    <section className="process-section" id="process">
      <h2 className="process-title">Our Process</h2>

      <div className="process-steps">

        {/* Step 1 */}
        <div className="process-step">
          <div className="icon-wrapper">
            <img src={calendarImg} alt="Appointment" className="process-icon" />
          </div>
          <h3>Make an Appointment</h3>
          <p>
            Leave a solicitation on the site and get a 7% rebate on the primary request
          </p>
        </div>

        <img src={arrowImg} alt="Arrow" className="arrow-img" />

        {/* Step 2 */}
        <div className="process-step">
          <div className="icon-wrapper">
            <img src={cleaningImg} alt="Working Process" className="process-icon" />
          </div>
          <h3>Working Process</h3>
          <p>
            At a helpful time for you, the cleaners will come to you and lead cleaning of the premises
          </p>
        </div>

        <img src={arrowImg} alt="Arrow" className="arrow-img" />

        {/* Step 3 */}
        <div className="process-step">
          <div className="icon-wrapper">
            <img src={paymentImg} alt="Payment" className="process-icon" />
          </div>
          <h3>Payment Process</h3>
          <p>
            After you ensure that everything is finished by your desires
          </p>
        </div>

      </div>

      <Link to="/booking">
        <button className="process-btn">
                Book In 1 Minute
        </button>
      </Link>

    </section>
  );
};

export default ProcessSection;

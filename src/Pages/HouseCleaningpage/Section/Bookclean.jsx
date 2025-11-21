import "../Section/Bookclean.css";
import bookingImg from "../../../assets/booking.jpg"; 

const Bookclean = () => {
  return (
    <section className="bookclean-cta">
      <div className="bookclean-left">
        <h2>
          Book a house cleaning appointment now <br />
          with Happy Home
        </h2>

        <button className="bookclean-btn">Book Appointment</button>
      </div>

      <div className="bookclean-right">
        <img src={bookingImg} alt="Booking Illustration" />
      </div>
    </section>
  );
};

export default Bookclean;

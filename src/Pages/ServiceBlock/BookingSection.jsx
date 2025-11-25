import "../ServiceBlock/BookingSection.css";
import { Link } from "react-router-dom";

const BookingSection = ({ data }) => {
  return (
    <section className="bookclean-cta">

      <div className="bookclean-left">
        <h2>{data?.title || "Đặt lịch ngay hôm nay"}</h2>

        <Link to="/booking">
          <button className="bookclean-btn">
            {data?.button_text || "Book now"}
          </button>
        </Link>
      </div>

      <div className="bookclean-right">
        <img
          src={data?.image_url}
          alt="Booking illustration"
        />
      </div>

    </section>
  );
};

export default BookingSection;

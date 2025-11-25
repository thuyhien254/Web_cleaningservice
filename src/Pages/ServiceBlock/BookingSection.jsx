import "../ServiceBlock/BookingSection.css";

const BookingSection = ({ data }) => {
  return (
    <section className="bookclean-cta">

      <div className="bookclean-left">
        <h2>
          {data?.title || "Đặt lịch ngay hôm nay"}
        </h2>

        <button className="bookclean-btn">
          {data?.button_text || "Book now"}
        </button>
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

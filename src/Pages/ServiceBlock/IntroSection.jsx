import "../ServiceBlock/IntroSection.css";

const IntroSection = ({ data }) => {
  const hasImage = data?.banner_image_url && data.banner_image_url.trim() !== "";

  return (
    <div className="cleaning-wrapper">

      <div className="cleaning-title-section">
        <h1>{data?.title || ""}</h1>
      </div>

      {hasImage ? (
        <section
          className="cleaning-hero"
          style={{
            backgroundImage: `url(${data.banner_image_url})`
          }}
        ></section>
      ) : (
        <section className="cleaning-hero placeholder-hero">
          <p className="placeholder-text">Chưa có ảnh nền</p>
        </section>
      )}

    </div>
  );
};

export default IntroSection;

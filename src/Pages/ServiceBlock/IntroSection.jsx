import "../ServiceBlock/IntroSection.css";

const IntroSection = ({ data }) => {
  return (
    <div className="cleaning-wrapper">

      <div className="cleaning-title-section">
        <h1>{data?.title || ""}</h1>
      </div>

      <section
        className="cleaning-hero"
        style={{
          backgroundImage: data?.banner_image_url
            ? `url(${data.banner_image_url})`
            : "none"
        }}
      ></section>

    </div>
  );
};

export default IntroSection;

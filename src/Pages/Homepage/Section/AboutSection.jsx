import "../Section/AboutSection.css";
import aboutImg from "../../../assets/about-img.png";

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-left">
          <div className="about-badge">10K+<br />Clients</div>
          <img src={aboutImg} alt="About us" className="about-img" />
          <div className="about-years">
            <span className="years-number">12+</span>
            <span className="years-text">Years Experience</span>
          </div>
        </div>

        <div className="about-right">
          <h2>About Us</h2>
          <p>
            We are a trusted and reliable cleaning company dedicated to providing
            exceptional service to our clients. Our team of experienced and
            professional cleaners is committed to making your space look and feel
            its best.
          </p>

          <h4>Our services include:</h4>
          <ul>
            <li> House cleaning service</li>
            <li> House moving service</li>
          </ul>

          <p>
            We use only the best cleaning products and techniques to ensure that
            your space is not only clean but also healthy and safe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

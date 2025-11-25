import { useState } from "react";
import "../ServiceBlock/ProcessSection.css";

const ProcessSection = ({ data }) => {
  const steps = data?.steps || [];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="moving-wrapper">

      <h2 className="moving-title">
        {data?.title || "Quy trình làm việc"}
      </h2>

      <div className="moving-steps-container">
        
        <div className="moving-steps-left">

          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-block ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="step-number">{index + 1}</div>

              <div>
                <h3 className="step-title">{step.step_title}</h3>

                {activeIndex === index && (
                  <ul className="step-details">
                    <li>{step.description}</li>
                  </ul>
                )}
              </div>
            </div>
          ))}

        </div>

        <div className="moving-steps-right">
          {steps[activeIndex] && (
            <img
              src={steps[activeIndex].image_url}
              alt={steps[activeIndex].step_title}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

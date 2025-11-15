import React, { useState } from "react";
import "../Section/MovingStepSection.css";

import step1Img from "../../../assets/moving-step1.jpg";
import step2Img from "../../../assets/moving-step2.jpg";
import step3Img from "../../../assets/moving-step3.jpg";

const MovingSteps = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="moving-wrapper">
      
      <h2 className="moving-title">
        Professional 3-Step House Moving Process
      </h2>

      <div className="moving-steps-container">
        <div className="moving-steps-left">

          <div
            className={`step-block ${active === 1 ? "active" : ""}`}
            onClick={() => setActive(1)}
          >
            <div className="step-number">1</div>
            <div>
              <h3 className="step-title">
                Sorting, dismantling, wrapping, packing & loading
              </h3>

              {active === 1 && (
                <ul className="step-details">
                  <li><b>Sorting:</b> Identify and categorize all items.</li>
                  <li><b>Dismantling:</b> Furniture, electronics, cabinets…</li>
                  <li><b>Wrapping:</b> PE film, foam sheets, bubble wrap.</li>
                  <li><b>Packing:</b> Pack fragile items safely.</li>
                  <li><b>Labeling:</b> Mark boxes clearly before loading.</li>
                </ul>
              )}
            </div>
          </div>

          <div
            className={`step-block ${active === 2 ? "active" : ""}`}
            onClick={() => setActive(2)}
          >
            <div className="step-number">2</div>
            <div>
              <h3 className="step-title">Transportation</h3>

              {active === 2 && (
                <ul className="step-details">
                  <li>The moving truck travels safely to the new location.</li>
                </ul>
              )}
            </div>
          </div>

          <div
            className={`step-block ${active === 3 ? "active" : ""}`}
            onClick={() => setActive(3)}
          >
            <div className="step-number">3</div>
            <div>
              <h3 className="step-title">
                Unloading & arranging items at the new home
              </h3>

              {active === 3 && (
                <ul className="step-details">
                  <li>Reassemble furniture and appliances.</li>
                  <li>Unpack and verify belongings with the customer.</li>
                  <li>Arrange everything neatly.</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="moving-steps-right">
          <img
            src={
              active === 1 ? step1Img :
              active === 2 ? step2Img : step3Img
            }
            alt="moving step"
          />
        </div>
      </div>
    </section>
  );
};

export default MovingSteps;

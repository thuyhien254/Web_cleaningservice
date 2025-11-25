import React, { useState } from "react";
import "../ServiceBlock/TaskTabsSection.css";

const TaskTabsSection = ({ data }) => {
  const tabs = data?.tabs || [];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="task-tabs-wrapper">
      <div className="task-tabs">

        <h2 className="task-title">
          {data?.title || "Nội dung công việc"}
        </h2>

        <div className="tabs">
          {tabs.map((t, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`tab-btn ${activeIndex === index ? "active" : ""}`}
            >
              {t.tab_title}
            </button>
          ))}
        </div>

        {tabs.length > 0 && (
          <div className="tab-content">
            <img
              src={tabs[activeIndex].image_url}
              alt={tabs[activeIndex].tab_title}
            />

            <ul>
              <li>{tabs[activeIndex].description}</li>
            </ul>
          </div>
        )}

      </div>
    </section>
  );
};

export default TaskTabsSection;

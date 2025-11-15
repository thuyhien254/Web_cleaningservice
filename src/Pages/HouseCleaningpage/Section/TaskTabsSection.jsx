import React, { useState } from "react";
import "../Section/TaskTabsSection.css";

import kitchenImg from "../../../assets/kitchen.jpg";
import livingImg from "../../../assets/livingroom.jpg";
import bedroomImg from "../../../assets/bedroom.jpg";
import bathroomImg from "../../../assets/bathroom.jpeg";

const TaskTabsSection = () => {
  const [activeTab, setActiveTab] = useState("kitchen");

  const tabs = [
    { id: "kitchen", label: "Kitchen" },
    { id: "living", label: "Living room" },
    { id: "bedroom", label: "Bedroom" },
    { id: "bathroom", label: "Bathroom" },
  ];

 const content = {
  kitchen: {
    img: kitchenImg,
    tasks: [
     "Wash dishes and organize kitchenware",
      "Dust and wipe all reachable surfaces",
      "Clean exterior surfaces of cabinets and appliances",
      "Wipe switches and handles",
      "Scrub stovetop",
      "Wipe countertops",
      "Clean the sink",
      "Take out the trash",
      "Sweep and mop the floor"
    ]
  },

  living: {
    img: livingImg,
    tasks: [
      "Dust tables, shelves, and surfaces",
      "Vacuum the entire living room",
      "Clean TV and cabinets",
      "Organize furniture and items",
      "Clean window glass"
    ]
  },

  bedroom: {
    img: bedroomImg,
    tasks: [
      "Make the bed neatly",
      "Change bed sheets",
      "Dust bedside tables",
      "Vacuum under the bed",
      "Organize clothing and personal items"
    ]
  },

  bathroom: {
    img: bathroomImg,
    tasks: [
      "Scrub and disinfect the toilet",
      "Clean mirrors",
      "Clean the bathtub or shower area",
      "Mop the floor to prevent slipping",
      "Clean faucets, handles, and shower fixtures"
    ]
  }
};
  return (
    <section className="task-tabs-wrapper">
      <div className="task-tabs">
        <h2 className="task-title">What will housekeepers do?</h2>

        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <img src={content[activeTab].img} alt={activeTab} />

          <ul>
            {content[activeTab].tasks.map((task, i) => (
              <li key={i}> {task}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TaskTabsSection;

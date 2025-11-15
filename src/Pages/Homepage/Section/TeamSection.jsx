import React from "react";
import "../Section/TeamSection.css";
import lanAnh from "../../../assets/team-lan-anh.png";
import kimOanh from "../../../assets/team-kim-oanh.jpg";
import quangAnh from "../../../assets/team-quang-anh.png";
import baHoang from "../../../assets/team-ba-hoang.png";

const TeamSection = () => {
  const team = [
    { name: "Lan Anh", role: "Home Cleaner", img: lanAnh },
    { name: "Kim Oanh", role: "Home Cleaner", img: kimOanh },
    { name: "Quang Anh", role: "Furniture Mover", img: quangAnh },
    { name: "Ba Hoang", role: "Furniture Mover", img: baHoang },
  ];

  return (
    <section className="team-section" id="team">
      <div className="team-header">
        <h2>Our Best Team Ever</h2>
        <div className="team-sub">
          <p>Professional, trusted, and dedicated</p>
          <a href="#team" className="team-link">
            Meet Our Professional Team
          </a>
        </div>
      </div>

      <div className="team-grid">
        {team.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.img} alt={member.name} className="team-photo" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;

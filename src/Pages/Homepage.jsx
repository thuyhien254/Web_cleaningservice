import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import ProcessSection from "../components/ProcessSection";
import Whychooseus from "../components/Whychooseus";
import TeamSection from "../components/TeamSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <Whychooseus />
      <TeamSection />
      <Footer />
    </>
  );
};

export default HomePage;

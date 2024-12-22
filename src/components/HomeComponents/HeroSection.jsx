import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div id="hero" className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">AI agents that work with Humans</h1>
        <p className="hero-subtitle">
          Pixolabs is an API and SDK that enables AI Agents to contact humans
          for feedback, input, and approvals.
        </p>
        <div className="hero-cta">
          <button className="get-started-btn">Get Started</button>
        </div>
      </div>
      <div className="hero-video">
        <div className="video-container">
          {/* Replace with your actual video or demo */}
          <video className="demo-video" autoPlay muted loop playsInline>
        <source src="/path-to-your-video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

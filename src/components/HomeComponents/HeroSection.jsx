import React from "react";
import "./HeroSection.css";
import demovideo from "../../assets/DemoVideo.mp4";
const HeroSection = () => {
  return (
    <div id="hero" className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">AI agents that work with Humans</h1>
        <p className="hero-subtitle">
          Pixolabs is an API and SDK that enables AI Agents to contact humans
          for feedback, input, and approvals.
        </p>
        {/* <div className="hero-cta">
          <button className="get-started-btn">Get Started</button>
        </div> */}
      </div>
      <div className="hero-video">
        <div className="video-container">
          <video
            className="demo-placeholder"
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            <source src={demovideo} type="video/mp4" />
            <source src={demovideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React from "react";
import "./HeroSection.css";
import demovideo from "../../assets/DemoVideo.mp4";
import { useContext } from "react";
import {GlobalContext} from "../../context/GlobalContext"
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const {user}=useContext(GlobalContext);
  const navigate=useNavigate();
  const handleClick=()=>{
        const token=localStorage.getItem('token');
        if(token){
            navigate('/Message')
        }
        else{
           navigate('/Register')
        }
  }
  return (
    <div id="hero" className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">AI agents that work with Humans</h1>
        <p className="hero-subtitle">
          Pixolabs is an API and SDK that enables AI Agents to contact humans
          for feedback, input, and approvals.
        </p>
        <div className="hero-cta">
          <button className="get-started-btn" onClick={handleClick}>Get Started</button>
          <button className="get-started-btn">Join Waitlist</button>
        </div>
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

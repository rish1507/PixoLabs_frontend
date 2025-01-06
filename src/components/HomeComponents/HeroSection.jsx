// HeroSection.jsx
import React, { useContext, useState } from "react";
import "./HeroSection.css";
import demovideo from "../../assets/DemoVideo.mp4";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const HeroSection = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Message');
    } else {
      navigate('/Register');
    }
  };

  const handleWaitlistClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Here you can add the logic to submit the waitlist data
    console.log('Waitlist submission:', formData);
    // Reset form and close modal
    setFormData({ name: '', email: '' });
    setOpen(false);
  };

  return (
    <div id="hero" className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">AI agents that work with Humans</h1>
        <p className="hero-subtitle">
          Pixolabs is an API and SDK that enables AI Agents to contact humans
          for feedback, input, and approvals.
        </p>
        <div className="hero-cta">
          <button className="get-started-btn" onClick={handleClick}>
            Get Started
          </button>
          <button className="get-started-btn" onClick={handleWaitlistClick}>
            Join Waitlist
          </button>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join Our Waitlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeroSection;
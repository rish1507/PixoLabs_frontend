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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import api from '../../utils/axios';
const HeroSection = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

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

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      );
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/waitList/join', {
        name:formData.name,
        email:formData.email
      });
      if (response.statusText!=="OK") {
        throw new Error('Failed to submit waitlist form');
      }
      setSnackbar({
        open: true,
        message: 'Successfully joined the waitlist!',
        severity: 'success'
      });
      setFormData({ name: '', email: '' });
      setOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to join waitlist. Please try again later.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
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
        <h1>Demo</h1>
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
          <Button 
            onClick={handleSubmit} 
            color="primary" 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HeroSection;
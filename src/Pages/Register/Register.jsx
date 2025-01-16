import React, { useState } from "react";
import { Eye } from "lucide-react";
import "./Register.css";
import api from "../../utils/axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [showGmailModal, setShowGmailModal] = useState(false);
  const { slackInitialized, setSlackInitialized } = useContext(GlobalContext);
  const [slackConfig, setSlackConfig] = useState({
    slackToken: "",
    channelId: "",
  });
  const handleClickOnGoogle = async () => {
    console.log("in google auth");
    try {
      const response = await api.get("/auth/gmail");
      console.log(response);
      window.location.href = response.data.url;
    } catch (err) {
      setError("Failed to initiate Google authentication");
      console.error(err);
    }
  };

  const handleContinuewithSlack = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGmailModalClose = () => {
    setShowGmailModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSlackConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/slack/initialize", {
        slackToken: slackConfig.slackToken,
        channelId: slackConfig.channelId,
      });
      localStorage.setItem("slackToken", slackConfig.slackToken);
      localStorage.setItem("channelId", slackConfig.channelId);
      setSlackInitialized(true);
      setOpen(false);
      setShowGmailModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="form-header">
          <h2>Create your account</h2>
          <p>to continue to PixoLabs</p>
        </div>
        <div className="form-content">
          <button
            onClick={handleClickOnGoogle}
            className="social-button google-button"
          >
            <svg className="social-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Continue with Google
          </button>
          <button
            className="social-button google-button"
            onClick={handleContinuewithSlack}
          >
            <svg className="social-icon" viewBox="0 0 24 24">
              <path
                fill="#4A154B"
                d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
              />
            </svg>
            Continue with Slack
          </button>
          <div className="form-footer">
            <div className="sign-in-link">
              <span>Have an account?</span>
              <a href="#">Sign in</a>
            </div>
            <div className="legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </div>

      {/* Slack Configuration Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Slack details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="slackToken"
            label="Bot Token"
            type="text"
            fullWidth
            variant="outlined"
            value={slackConfig.slackToken}
            onChange={handleInputChange}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: "8px", fontWeight: "bold" }}
          >
            You can find your Bot Token using on
            <a
              href="https://api.slack.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                marginLeft: "4px",
              }}
            >
              Slack API settings page
            </a>
            .
          </Typography>
          <TextField
            margin="dense"
            name="channelId"
            label="Channel Id"
            type="text"
            fullWidth
            variant="outlined"
            value={slackConfig.channelId}
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

      {/* Gmail Connection Modal */}
      <Dialog open={showGmailModal} onClose={handleGmailModalClose}>
        <DialogTitle>Connect Gmail Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ marginBottom: "16px" }}>
            Great! Your Slack configuration has been saved. Would you like to
            connect your Gmail account now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGmailModalClose} color="primary">
            Skip for now
          </Button>
          <Button
            onClick={handleClickOnGoogle}
            color="primary"
            variant="contained"
            startIcon={
              <svg
                className="social-icon"
                viewBox="0 0 24 24"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  fill="#FFFFFF"
                  d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                />
                <path
                  fill="#FFFFFF"
                  d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
                />
                <path
                  fill="#FFFFFF"
                  d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
                />
                <path
                  fill="#FFFFFF"
                  d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
            }
          >
            Continue with Gmail
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;

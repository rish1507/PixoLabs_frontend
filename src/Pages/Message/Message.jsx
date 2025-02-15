// Message.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Snackbar, Alert } from "@mui/material";
import "./Message.css";
import {
  GenerateEmailModal,
  AIEditModal,
  ManualEditModal,
  FeedbackModal,
} from "../../components/MessageComponents/Modals";
import {
  EmailItem,
  GeneratedEmailContent,
} from "../../components/MessageComponents/EmailComponents";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
const Message = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [showAIEditModal, setShowAIEditModal] = useState(false);
  const [showManualEditModal, setShowManualEditModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [emailDescription, setEmailDescription] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [aiInstructions, setAIInstructions] = useState("");
  const [manualEditText, setManualEditText] = useState("");
  const [applyFilterText,setApplyFilterText]=useState("Apply Filter");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { emailSummary, user,setEmailSummary } = useContext(GlobalContext);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [startDate, setStartDate] = useState(dayjs()); // Today's date as default
  const [endDate, setEndDate] = useState(dayjs());
  const navigate = useNavigate();
  console.log(user);
  const handleApplyDateFilter = async () => {
    setApplyFilterText("Fetching")
    try {
      const summaryAndData = await api.get(`/emails/summaries`, {
        params: {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD')
        }
      });
      setEmailSummary(summaryAndData.data.emailSummaries);
  
      if(localStorage.getItem('slackToken')){
        const response = await api.post("/slack/initialize", {
          slackToken: localStorage.getItem("slackToken"),
          channelId: localStorage.getItem("channelId")
        });
        const messageResponse = await api.post("/slack/send-message", {
          emailsData: summaryAndData.data.emailsData,
        });
        console.log(messageResponse);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
    setApplyFilterText("Apply Filter")
  };
  const handleGenerateEmail = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/emails/generate", {
        instructions: emailDescription,
        emailId: selectedEmail.emailId,
        subject: selectedEmail.subject,
        originalBody: selectedEmail.body,
        from: selectedEmail.from.split(" <")[0],
        sender: user.name,
      });
      setGeneratedEmail(response.data.content);
      setShowInitialModal(false);
      setIsEmailModalOpen(true);
    } catch (error) {
      console.error("Error generating email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIEdit = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/emails/edit", {
        content: generatedEmail,
        instructions: aiInstructions,
      });
      setGeneratedEmail(response.data.content);
      setShowAIEditModal(false);
      setIsEmailModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleManualEdit = () => {
    setGeneratedEmail(manualEditText);
    setShowManualEditModal(false);
    setIsEmailModalOpen(true);
  };
  const handleApprove = async () => {
    try {
      await api.post("/emails/send", {
        emailId: selectedEmail.emailId,
        content: generatedEmail,
        subject: `Re: ${selectedEmail.subject}`,
      });
      setGeneratedEmail("");
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error sending email:", error);
      // Optional: Add error notification
    }
  };
  const handleFeedbackSubmit = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowFeedbackModal(false);
      setFeedbackText("");
      setFeedbackRating(5);
    } finally {
      setIsLoading(false);
    }
  };
  if (emailSummary?.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        }}
      >
        <h2>Loading Summary...</h2>
      </div>
    );
  }
  return (
    <div className="app-container">
      <div className="email-list">
        <div className="gradient-text">
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          Hi {user?.name}, here's your inbox summary
        </div>
        <div style={{ display: "flex", gap: "20px", margin: "20px 10px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
          <button
            className="apply-filter-btn"
            onClick={handleApplyDateFilter}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              height: "40px",
            }}
          >
           {applyFilterText}
          </button>
        </div>
        {emailSummary?.map((email, index) => (
          <EmailItem
            key={index}
            email={email}
            onReplyClick={() => {
              setSelectedEmail(email);
              setShowInitialModal(true);
              console.log(email);
            }}
          />
        ))}
        <GeneratedEmailContent
          open={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          generatedEmail={generatedEmail}
          onApprove={handleApprove}
          onAIEdit={() => setShowAIEditModal(true)}
          onReject={() => setGeneratedEmail("")}
          setManualEditText={setManualEditText}
          setShowManualEditModal={setShowManualEditModal}
        />
      </div>

      <div className="bottom-bar">
        <button
          className="start-chat-btn"
          onClick={() => setShowInitialModal(true)}
        >
          Start Chat
        </button>
        <button
          className="feedback-btn"
          onClick={() => setShowFeedbackModal(true)}
        >
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faComment} />{" "}
          Give Feedback
        </button>
      </div>
      <GenerateEmailModal
        open={showInitialModal}
        onClose={() => setShowInitialModal(false)}
        emailDescription={emailDescription}
        setEmailDescription={setEmailDescription}
        handleGenerateEmail={handleGenerateEmail}
        isLoading={isLoading}
      />

      <AIEditModal
        open={showAIEditModal}
        onClose={() => setShowAIEditModal(false)}
        generatedEmail={generatedEmail}
        aiInstructions={aiInstructions}
        setAIInstructions={setAIInstructions}
        handleAIEdit={handleAIEdit}
        isLoading={isLoading}
      />

      <ManualEditModal
        open={showManualEditModal}
        onClose={() => setShowManualEditModal(false)}
        manualEditText={manualEditText}
        setManualEditText={setManualEditText}
        handleManualEdit={handleManualEdit}
      />

      <FeedbackModal
        open={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        feedbackRating={feedbackRating}
        setFeedbackRating={setFeedbackRating}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
        handleFeedbackSubmit={handleFeedbackSubmit}
        isLoading={isLoading}
      />
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "1rem",
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
          }}
        >
          Email successfully sent!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Message;

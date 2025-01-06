// EmailList.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencil,
  faRobot,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
export const EmailItem = ({ email, onReplyClick }) => (
  <div className="email-item">
    <div className="email-header">
      <span className="email-id-title">From:</span>{" "}
      <span className="email-address">{email.from}</span>
    </div>
    <div className="email-subject">
      <span className="email-subject-title">Subject: </span>
      {email.subject}
    </div>
    <div className="email-summary">
      <span className="email-summary-title">Summary: </span>
      {email.summary}
    </div>
    <button className="start-reply-btn" onClick={onReplyClick}>
      Reply
    </button>
  </div>
);
export const GeneratedEmailContent = ({
  open, // new prop for modal
  onClose, // new prop for modal
  generatedEmail,
  onApprove,
  onAIEdit,
  onReject,
  setManualEditText,
  setShowManualEditModal,
}) => (
  <Dialog
    open={open}
    disableEscapeKeyDown
    disableBackdropClick
    hideBackdrop={false}
    maxWidth="md"
    fullWidth
  >
    <DialogTitle>Generated Email</DialogTitle>
    <DialogContent>
      <div className="generated-email">
        <div className="email-content">{generatedEmail}</div>
        <div className="action-buttons">
          <button
            className="btn btn-approve"
            onClick={() => {
              onApprove();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faCheck} /> Approve
          </button>
          <button
            className="btn btn-edit"
            onClick={() => {
              onAIEdit();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faRobot} /> Edit with AI
          </button>
          <button
            className="btn btn-edit"
            onClick={() => {
              setManualEditText(generatedEmail);
              setShowManualEditModal(true);
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faPencil} /> Edit Myself
          </button>
          <button
            className="btn btn-reject"
            onClick={() => {
              onReject();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={faTimes} /> Reject
          </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

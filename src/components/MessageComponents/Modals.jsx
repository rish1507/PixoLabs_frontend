// GenerateEmailModal.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

export const GenerateEmailModal = ({ open, onClose, emailDescription, setEmailDescription, handleGenerateEmail, isLoading }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Explain the agent what to do</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Describe the email you want to generate..."
        value={emailDescription}
        onChange={(e) => setEmailDescription(e.target.value)}
        margin="normal"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleGenerateEmail} variant="contained" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate"}
      </Button>
    </DialogActions>
  </Dialog>
);

// AIEditModal.js
export const AIEditModal = ({ open, onClose, generatedEmail, aiInstructions, setAIInstructions, handleAIEdit, isLoading }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Edit with AI</DialogTitle>
    <DialogContent>
      <div className="original-email">{generatedEmail}</div>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Provide instructions for AI editing..."
        value={aiInstructions}
        onChange={(e) => setAIInstructions(e.target.value)}
        margin="normal"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleAIEdit} variant="contained" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </DialogActions>
  </Dialog>
);

// ManualEditModal.js
export const ManualEditModal = ({ open, onClose, manualEditText, setManualEditText, handleManualEdit }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Edit Message</DialogTitle>
    <DialogContent>
      <TextField
        multiline
        rows={6}
        fullWidth
        variant="outlined"
        value={manualEditText}
        onChange={(e) => setManualEditText(e.target.value)}
        margin="normal"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleManualEdit} variant="contained">
        Update
      </Button>
    </DialogActions>
  </Dialog>
);

// FeedbackModal.js
export const FeedbackModal = ({ open, onClose, feedbackRating, setFeedbackRating, feedbackText, setFeedbackText, handleFeedbackSubmit, isLoading }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Submit Feedback</DialogTitle>
    <DialogContent>
      <div className="rating-container">
        <label>Rating (1-5):</label>
        <input
          type="range"
          min="1"
          max="5"
          value={feedbackRating}
          onChange={(e) => setFeedbackRating(Number(e.target.value))}
          className="rating-slider"
        />
        <span>{feedbackRating}</span>
      </div>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Please share your feedback about the email generation experience..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        margin="normal"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleFeedbackSubmit} variant="contained" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </DialogActions>
  </Dialog>
);
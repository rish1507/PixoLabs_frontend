import React, { useState, useEffect } from "react";
import {
  FaBox,
  FaUserCheck,
  FaCommentDots,
  FaRobot,
  FaUsers,
  FaTools,
  FaExclamationTriangle,
  FaRoute,
  FaCog,
  FaRocket,
} from "react-icons/fa";
import "./Home/Home.css"
function Start() {
  const [activeSection, setActiveSection] = useState("approval");
  const [inputClicked, setInputClicked] = useState(false);
  const [inputValue, setInputValue] = useState(
    "Send my time availability to Jack and followup with Tom"
  );
  const handleInputClicked = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    setInputValue("");
    setInputClicked(true);
  };
  const messageExample = {
    agentMessage:
      "Your inbox for today includes 1 spam message, and 1 message from Sarah who seems interested in your product - [here's the link](https://linkedin.com/in/msg/124).\n\nTerri has still not responded to your question about scheduling an onboarding call.",
    responses: [
      {
        author: "Pixolabs",
        message: "👇 to help with routing, please respond in this thread 👇",
        showActions: false,
      },
      {
        author: "Pixolabs",
        message:
          "this is the revised message 'Hi Jack, I am available from 12pm to 1pm. Please let me know if that works. Thanks.' ",
        showActions: true,
      },
      {
        author: "Pixolabs",
        message:
          "Followup for Tom 'Hi Tom, I am following up on my last email. Did you get a chance to look at it?. Thanks'",
        showActions: true,
      },
    ],
  };
  return (
    <div className="message-interface" style={{marginTop:"20px",marginBotttom:"100px"}}>
    <div className="message-header">
      <div className="app-icon">
        <span>P</span>
      </div>
      <div className="header-text">
        <span className="app-name">Pixolabs APP</span>
        <span className="time">3 minutes ago</span>
      </div>
    </div>

    <div className="agent-request">
      <div className="agent-header">
        <FaRocket className="rocket-icon" />
        <span>
          Agent AutomateEmail101 would like to request input from you.
          Here is the information of the message :
        </span>
      </div>

      <div className="message-content">
        {messageExample.agentMessage}
      </div>
      
    </div>
    <div className="message-divider">
      Would you like me to respond with your availablity? 
    </div>
    <div className="action-buttons">
      <button className="action-btn approve">Approve</button>
      <button className="action-btn decline">Decline</button>
      <button className="action-btn edit">Edit</button>
    </div>
    <div className="message-replies">
      {messageExample.responses.map((response, index) => (
        inputClicked || index===0?
       ( <div key={index} className="response-item">
          <div className="response-header">
            <div className="app-icon">
              <span>{response.author[0]}</span>
            </div>
            <span className="author">{response.author}</span>
            <span className="time">3 minutes ago</span>
          </div>
          <div className="response-content">{response.message}</div>
          {response.showActions &&(
            <div className="action-buttons">
              <button className="action-btn approve">Approve</button>
              <button className="action-btn decline">Decline</button>
              <button className="action-btn edit">Edit</button>
            </div>
          )}
          {!response.showActions&&(<div className="message-input">
                   <input
                     value={inputValue}
                    onKeyDown={handleInputClicked}
                   />
          </div>)}
        </div>):null
      ))}
    </div>
  </div>
  );
}

export default Start;

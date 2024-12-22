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
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // or any other dark theme
import "./HowItWorks.css";
import image from "../../../src/assets/messageui.png"
const HowItWorks = () => {
  const [activeSection, setActiveSection] = useState("approval");
  const [inputClicked,setInputClicked]=useState(false);
  const [inputValue,setInputValue]=useState("Send my time availability to Jack and followup with Tom")
  const handleInputClicked=(e)=>{
    if(e.key!=="Enter"){
       return;
    }
     setInputValue("")
     setInputClicked(true)
  }
  const sections = {
    approval: {
      title: "Approval Workflows",
      content: [
        {
          icon: <FaBox />,
          text: "Get running with SDK in 5 minutes",
        },
        {
          icon: <FaUserCheck />,
          text: "Guarantee human oversight of key function calls",
        },
        {
          icon: <FaCommentDots />,
          text: "On denial, feedback added to agent context window",
        },
      ],
    },
    humanTool: {
      title: "Human as Tool",
      content: [
        {
          icon: <FaRobot />,
          text: "Seamless integration of human expertise in AI workflows",
        },
        {
          icon: <FaUsers />,
          text: "Real-time human validation and decision making",
        },
        {
          icon: <FaTools />,
          text: "Custom tool creation for specific use cases",
        },
      ],
    },
  };

  const codeExample = `from Pixolabs import Pixolabs
pl = Pixolabs()

@pl.require_approval()
def send_email(to: str, subject: str, body: str):
    """Send an email to the customer"""
    
def run_llm_task(prompt, tools, llm="gpt-4"):
    """Your custom LLM task implementation"""
    ...
    
run_llm_task(
    prompt="Send an email welcoming the user to
    the platform and encouraging them to...",
    tools=[send_email],
    llm="gpt-4"
)`;

  const messageExample = {
    agentMessage:
      "Your inbox for today includes 1 spam message, and 1 message from Sarah who seems interested in your product - [here's the link](https://linkedin.com/in/msg/124).\n\nTerri has still not responded to your question about scheduling an onboarding call.",
    responses: [
      {
        author: "Pixolabs",
        message: "👇 to help with routing, please respond in this thread 👇",
        showActions: false
      },
      {
        author: "Pixolabs",
        message: "this is the revised message 'Hi Jack, I am available from 12pm to 1pm. Please let me know if that works. Thanks.' ",
        showActions: true
      },
      { 
        author:"Pixolabs",
        message:"Followup for Tom 'Hi Tom, I am following up on my last email. Did you get a chance to look at it?. Thanks'",
        showActions: true
      },
    ],
  };

  useEffect(() => {
    // Initialize syntax highlighting
    hljs.highlightAll();
  }, []);

  return (
    <div className="how-it-works" id="how-it-works">
      <div className="how-it-works-container">
        <div className="left-section">
          {Object.entries(sections).map(([key, section]) => (
            <div
              key={key}
              className={`workflow-card ${
                activeSection === key ? "active-card" : ""
              }`}
              onClick={() =>
                setActiveSection(activeSection === key ? null : key)
              }
            >
              <h2>{section.title}</h2>
              {activeSection === key && (
                <div className="features-list">
                  {section.content.map((item, index) => (
                    <div key={index} className="feature-item">
                      <span className="icon">{item.icon}</span>
                      <span className="text">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="code-section">
            {activeSection==="approval"&&<h3>Manage AI Agents Effectively</h3>}
            {activeSection==="approval"&&<img className="messsage-image" src={image}/>}
          <div className="message-interface">
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
          
          <pre>
            <code className="language-python">{codeExample}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

/*approve", "decline", "edit"*/
/*"
Followup for Tom " Hi Tom, I am following up on my last email. Did you get a chance to look at it?. Thanks"*/
/*send my time availability to jack and followup with tom*/ 
/*Manage AI Agents Effectively*/
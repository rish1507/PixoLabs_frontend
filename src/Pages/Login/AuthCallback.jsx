// src/components/AuthCallback.js
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import api from "../../utils/axios";
import "./AuthCallback.css"
import { GlobalContext } from "../../context/GlobalContext";
const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const {emailSummary,setEmailSummary,setUser,user,slackInitialized,setSlackInitialized}=useContext(GlobalContext);
  useEffect(() => {
    const handleCallback = async () => {
      console.log("in calllback")
      const code = searchParams.get("code");
      if (!code) {
        setError("No authorization code received");
        return;
      }
      try {
        const response = await api.get(
          `/auth/gmail/callback?code=${code}`
        );
        console.log(response);
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem('User', JSON.stringify(response.data.user));
        setUser(response.data.user);
        const summaryAndData = await api.get(
          `/emails/summaries`
        );
        setEmailSummary(summaryAndData.data.emailSummaries);
        console.log(summaryAndData.data.emailSummaries);
        if(localStorage.getItem('slackToken')){
          const messageResponse = await api.post("/slack/send-message", {
            emailsData: summaryAndData.data.emailsData,
          });
        }
       navigate('/Message')
      } catch (err) {
        console.error("Auth error:", err);
        setError("Failed to complete authentication");
      }
    }
    handleCallback();
  }, [searchParams,navigate]);

  return (
    <div className="callback-container">
      <div className="loading-spinner">Completing authentication...</div>
    </div>
  );
};

export default AuthCallback;


/* */
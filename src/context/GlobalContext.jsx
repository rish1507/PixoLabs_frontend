import React, { createContext, useEffect, useState } from 'react';
import { useRef } from 'react';
// Create the context
export const GlobalContext = createContext();
import api from '../utils/axios';
// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [emailSummary,setEmailSummary] = useState([]);
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('User')));
  const [slackInitialized,setSlackInitialized]=useState(false);
  useEffect(()=>{
          async function fetchSummary(){
            const summaryAndData  = await api.get(
                `/emails/summaries`
              );
              setEmailSummary(summaryAndData.data.emailSummaries)
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
          }
          fetchSummary();
  },[])
  return (
    <GlobalContext.Provider value={{ emailSummary,setEmailSummary,user,setUser,slackInitialized,setSlackInitialized }}>
      {children}
    </GlobalContext.Provider>
  );
};

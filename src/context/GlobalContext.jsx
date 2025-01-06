import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const GlobalContext = createContext();
import api from '../utils/axios';
// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [emailSummary,setEmailSummary] = useState([]);
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('User')))
  useEffect(()=>{
          async function fetchSummary(){
            const summaryResponse = await api.get(
                `/emails/summaries`
              );
              setEmailSummary(summaryResponse.data)
          }
          fetchSummary();
  },[])
  return (
    <GlobalContext.Provider value={{ emailSummary,setEmailSummary,user,setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

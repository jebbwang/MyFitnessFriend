/*
    This exists as a wrapper component for EndScreen.js.

    Enables data to be serialized into JSON format by passed in parameters as useContext.
*/
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCompletedInitialPages, setUserCompletedInitialPages] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{
      userCompletedInitialPages,
      setUserCompletedInitialPages,
      userId, 
      setUserId
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

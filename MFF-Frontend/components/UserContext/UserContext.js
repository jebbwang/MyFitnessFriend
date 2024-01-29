/*
    This exists as a wrapper component for EndScreen.js.

    Enables data to be serialized into JSON format by passed in parameters as useContext.
*/
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCompletedInitialPages, setUserCompletedInitialPages] = useState(false);

  return (
    <UserContext.Provider value={{ userCompletedInitialPages, setUserCompletedInitialPages }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

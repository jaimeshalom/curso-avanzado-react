import { useApolloClient } from '@apollo/client';
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token');
  });
  const client = useApolloClient();

  const value = {
    isAuth,
    activateAuth: (token) => {
      setIsAuth(true);
      window.sessionStorage.setItem('token', token);
    },
    removeAuth: () => {
      client.resetStore();
      setIsAuth(false);
      window.sessionStorage.removeItem('token');
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

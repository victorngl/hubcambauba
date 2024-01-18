'use client'

import { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextProps {
  user: any;
  setCurrentUser: (user: any | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const [user, setCurrentUser] = useState<any | null>(null);

  return (
    <UserContext.Provider value={{ user, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {

  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
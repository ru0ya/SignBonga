import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user data exists in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const updateUser = (userData) => {
    setUser(userData);
    // Also save to localStorage for persistence
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

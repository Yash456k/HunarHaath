import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start (prefer sessionStorage per-tab)
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const userDataRaw = sessionStorage.getItem('user') || localStorage.getItem('user');
    
    if (token && userDataRaw) {
      try {
        setUser({ token, ...JSON.parse(userDataRaw) });
      } catch (error) {
        console.error('Error parsing user data:', error);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token, { persist = 'session' } = {}) => {
    setUser({ ...userData, token });
    const storage = persist === 'local' ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (userData) => {
    const updated = { ...user, ...userData };
    setUser(updated);
    // Persist to both storages for safety
    sessionStorage.setItem('user', JSON.stringify(updated));
    localStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

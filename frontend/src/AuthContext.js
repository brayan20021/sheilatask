import React, { createContext, useState } from 'react';

// Crea el contexto
const AuthContext = createContext();

// Crea el proveedor del contexto
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

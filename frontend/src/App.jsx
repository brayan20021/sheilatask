import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Signature from './components/Signature';
import SignatureList from './components/SignatureList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Obtener los datos del usuario del localStorage utilizando el token
      const userData = localStorage.getItem('userData');
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="app">
      {isLoggedIn && <Sidebar />}
      <div id='main' className='layout-navbar'>
        {isLoggedIn && <Header user={user} />}
        <div id='main-content'>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route
              path="/signature"
              element={isLoggedIn ? <Signature user={user} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/signaturelist/:id" // Corregido: añade "/:id" al final del path
              element={isLoggedIn ? <SignatureList user = { user}/> : <Navigate to="/login" replace />}
            />

            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
            />

            {/* Agrega más rutas según tus necesidades */}
          </Routes>

        </div>
      </div>
    </div>
  );
};

export default App;

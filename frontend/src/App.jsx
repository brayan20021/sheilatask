import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import jwtDecode from 'jwt-decode';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)

  // Verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');


    if (token) {

      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsLoggedIn(true)

    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="app">
      {isLoggedIn && <Sidebar />}
      <div id='main' className='layout-navbar'>
        {isLoggedIn && <Header />}
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

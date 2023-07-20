import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Signature from './components/Signature';
import SignatureList from './components/SignatureList';
import Note from './components/Notes';

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

  const logout = () => {
    // Eliminar el token del local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // Actualizar el estado para indicar que el usuario ha cerrado sesión
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {

    return <Login setIsLoggedIn={setIsLoggedIn} />

  }

  return (
    /*   <Login setIsLoggedIn={setIsLoggedIn} /> */


    <div className="app">
      {isLoggedIn && <Sidebar />}
      <div id='main' className='layout-navbar'>
        {isLoggedIn && <Header user={user} onLogout={logout} />}
        <div id='main-content'>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" />}
            />

            <Route
              path="/signature"
              element={isLoggedIn ? <Signature user={user} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/signaturelist/:idsignature" // Corregido: añade "/:id" al final del path
              element={isLoggedIn ? <SignatureList user={user} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/notes"
              element={isLoggedIn ? <Note user={user} /> : <Navigate to="/login" replace />}
            />


            {/* Agrega más rutas según tus necesidades */}
          </Routes>

        </div>
      </div>
    </div>

  );
};

export default App;

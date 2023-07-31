import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Signature from './components/Signature';
import SignatureList from './components/SignatureList';
import Note from './components/Notes';
import Addnote from './components/Addnotes';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showHeader, setShowHeader] = useState(true); // Nuevo estado para controlar la visibilidad del Header

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

  // Nuevo: Obtener la ubicación actual
  const location = useLocation();

  // Nuevo: Controlar la visibilidad del Header según la ruta actual
  useEffect(() => {
    setShowHeader(!location.pathname.startsWith('/notes'));
  }, [location]);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="app">
      {isLoggedIn && <Sidebar />}
      <div id='main' className='layout-navbar'>
        {/* Nuevo: Mostrar el Header solo si showHeader es true */}
        {showHeader && isLoggedIn && <Header user={user} onLogout={logout} />}
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
              path="/signaturelist/:idsignature"
              element={isLoggedIn ? <SignatureList user={user} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/notes"
              element={isLoggedIn ? <Note user={user} /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/addnotes"
              element={isLoggedIn ? <Addnote user={user} /> : <Navigate to="/login" replace />}
            />

            {/* Agrega más rutas según tus necesidades */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

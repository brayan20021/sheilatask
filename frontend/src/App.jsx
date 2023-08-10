import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Signature from './components/signature/Signature';
import SignatureList from './components/signature/SignatureList';
import Note from './components/notes/Notes';
import Addnote from './components/notes/Addnotes';
import WelcomeLoader from './components/WelcomeLoader';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  //check if user is on dashboard to start background
  const location = useLocation();
  const isDashboardPage = location.pathname === '/dashboard';




  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Get user data from LocalStorage using token.
      const userData = localStorage.getItem('userData');
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }

    setTimeout(() => {

      setLoading(false)

    }, 5000);

  }, []);

  const logout = () => {
    // remove token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // update state to indicate user is logged out 
    setIsLoggedIn(false);
  };


  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div>

      {loading ? (
        <WelcomeLoader user={user} />
      ) : (
        <div className="app">
          {isLoggedIn && <Sidebar user={user} onLogout={logout} />}
          <div id='main' className='layout-navbar'>

            {isDashboardPage ?
              <div id='main-content' className='dashboard-background'>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
                  />
                </Routes>
              </div>
              : ""}
              
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
                  path="/notes"
                  element={isLoggedIn ? <Note user={user} /> : <Navigate to="/login" replace />}
                />

                <Route
                  path="/addnotes"
                  element={isLoggedIn ? <Addnote user={user} /> : <Navigate to="/login" replace />}
                />

              </Routes>
            </div>
          </div>
        </div>

      )
      }
    </div >
  );
};

export default App;

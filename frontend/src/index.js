import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
/* import reportWebVitals from './reportWebVitals'; */


// Importar CSS global
//import './assets/css/style.css';
import './assets/css/bootstrap.css';
import './assets/vendors/bootstrap-icons/bootstrap-icons.css';
import './assets/css/app.css';
import './assets/css/pages/auth.css';




ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Resto del código

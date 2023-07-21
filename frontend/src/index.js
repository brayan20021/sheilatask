import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { UserProvider } from './UserContext';
/* import reportWebVitals from './reportWebVitals'; */


// Importar CSS global

import './assets/css/bootstrap.css';
import './assets/vendors/bootstrap-icons/bootstrap-icons.css';
import './assets/css/app.css';
import './assets/css/pages/auth.css';

import './assets/vendors/iconly/bold.css';
import './assets/vendors/perfect-scrollbar/perfect-scrollbar.css';
import './assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js';
import './assets/vendors/bootstrap-icons/bootstrap-icons.css';
import './assets/css/personalizado.css';
import './assets/vendors/sweetalert2/sweetalert2.min.css';
import './assets/vendors/fontawesome/all.min.js';
import './assets/js/bootstrap.bundle.min.js';
import './assets/css/pages/dripicons.css';
import './assets/vendors/dripicons/webfont.css';
import './assets/vendors/tinymce/skins/ui/oxide/skin.min.css';
import './assets/vendors/tinymce/tinymce.min.js';
 import './assets/vendors/tinymce/plugins/code/plugin.min.js'; 


import './assets/vendors/sweetalert2/sweetalert2.all.min.js';
import './assets/vendors/apexcharts/apexcharts.js';
import './assets/js/sweetalerts.js';
import './assets/js/jquery.min.js';
/*
import './assets/js/main.js';

import './assets/js/extensions/sweetalert2.js';


import './assets/js/pages/dashboard.js';

*/


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

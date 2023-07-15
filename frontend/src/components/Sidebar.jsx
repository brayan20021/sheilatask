import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (

      <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header">
            <div className="d-flex justify-content-between">
              <div className="logo">
                <Link to="/"><img src="/images/logo/logo.png" alt="Logo" style={{ height: '50%' }} /></Link>
              </div>
              <div className="toggler">
                <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
              </div>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              <li className="sidebar-title">Menu</li>
              <li className="sidebar-item">
                <Link to="/dashboard" className="sidebar-link">
                  <i className="bi bi-grid-fill"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/signature" className="sidebar-link">
                  <i className="bi bi-collection-fill"></i>
                  <span>Asignaturas</span>
                </Link>
              </li>
              <li className="sidebar-item has-sub">
                <a href="#" className="sidebar-link">
                  <i className="bi bi-stack"></i>
                  <span>Notas</span>
                </a>
                <ul className="submenu">
                  <li className="submenu-item">
                    <Link to="/fast-notes">Listas</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/completed-tasks">Tareas finalizadas</Link>
                  </li>
                </ul>
              </li>
              <li className="sidebar-item has-sub">
                <a href="#" className="sidebar-link">
                  <i className="bi bi-grid-1x2-fill"></i>
                  <span>Configuracion</span>
                </a>
                <ul className="submenu">
                  <li className="submenu-item">
                    <Link to="/default-layout">Default Layout</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/1-column-layout">1 Column</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/vertical-navbar-layout">Vertical with Navbar</Link>
                  </li>
                  <li className="submenu-item">
                    <Link to="/horizontal-layout">Horizontal Menu</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
        </div>
      </div>

  );
};

export default Sidebar;

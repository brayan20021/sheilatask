import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeDOMManipulation } from './domManipulation';
import PerfectScrollbar from 'perfect-scrollbar';
import { logo } from '../assets'; 


const Sidebar = () => {
  

  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

    useEffect(() => {
      initializeDOMManipulation();
    }, []);

    

  return (

    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <div className="d-flex justify-content-between">
            <div className="logo">
              <Link to="/"><img src={logo} alt="Logo" style={{ height: '50%' }} /></Link>
            </div>
            <div className="toggler">
              <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Menu</li>
            <li className={`${activeItem === 'dashboard'
              ? "sidebar-item active"
              : "sidebar-item"}`}
              onClick={() => { handleItemClick('dashboard') }}>
              <Link to="/dashboard" className="sidebar-link">
                <i className="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className={`${activeItem === "notes"
              ? "sidebar-item active"
              : "sidebar-item"}`}
              onClick={() => {
                handleItemClick('notes')
              }}>
              <Link to="/notes" className="sidebar-link">
                <i className="bi bi-collection-fill"></i>
                <span>Notes</span>
              </Link>
            </li>

            <li className={`${activeItem === "signature"
              ? "sidebar-item active"
              : "sidebar-item"}`}
              onClick={() => {
                handleItemClick('signature')
              }}>
              <Link to="/signature" className="sidebar-link">
                <i className="bi bi-collection-fill"></i>
                <span>Asignaturas</span>
              </Link>
            </li>

            <li className={`${activeItem === "config"
              ? "sidebar-item has-sub active"
              : "sidebar-item has-sub"}`}
              onClick={() => { handleItemClick('config') }}>
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

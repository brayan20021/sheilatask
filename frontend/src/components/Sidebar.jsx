import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeDOMManipulation } from './domManipulation';
import PerfectScrollbar from 'perfect-scrollbar';
import { logo, face } from '../assets';


const Sidebar = ({ user, onLogout }) => {


  const [activeItem, setActiveItem] = useState('dashboard');
  const userData = JSON.parse(user)

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
            <li className={`${activeItem === "nuevo"
              ? "sidebar-item "
              : "sidebar-item"}`}
              onClick={() => {
                handleItemClick('nuevo')
              }}>
              <Link to="/addnotes" className="sidebar-link btn btn-outline-success text-blue">
                <div class="icon dripicons-document-edit"><span >Nuevo</span></div>
              </Link>
            </li>
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
                <span>Notas</span>
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
              <Link href="#" className="sidebar-link">
                <div className="user-img d-flex align-items-center">
                  <div className="avatar avatar-md" style={{ marginLeft: "-7px" }}>
                    <img src={face} alt="User Avatar" />
                  </div>
                </div>
                <span>{userData.fullname}</span>
              </Link>
              <ul className="submenu">
                <li className="submenu-item">
                  <Link to="/default-layout">Tema</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/1-column-layout">Usuario</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/horizontal-layout" onClick={onLogout}>Cerrar sesión</Link>
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

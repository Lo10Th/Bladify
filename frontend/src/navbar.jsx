import React, { useState } from 'react';
import './navbar/navbar-style.css';

function Navbar() {
  const [isSidebarLocked, setSidebarLocked] = useState(true);

  const toggleSidebarLock = () => {
    setSidebarLocked(!isSidebarLocked);
  };

  return (
    <nav className={`sidebar ${isSidebarLocked ? 'locked' : 'unlocked'}`}>
      <div className="logo_items flex">
        <span className="nav_image">
          <img src="/Bladify Logo.png" alt="logo_img" />
        </span>
        <span className="logo_name">Bladyfiy</span>
        <i className={`bx ${isSidebarLocked ? 'bx-lock-alt' : 'bx-lock-open-alt'}`} id="lock-icon" title="Unlock Sidebar"></i>
        <i className="bx bx-x" id="sidebar-close"></i>
      </div>

      <div className="menu_container">
        <div className="menu_items">
          <ul className="menu_item">
            <div className="menu_title flex">
              <span className="title">Dashboard</span>
              <span className="line"></span>
            </div>
            <li className="item">
              <a href="/" className="link flex">
                <i className="bx bx-home-alt"></i>
                <span>Overview</span>
              </a>
            </li>
            <li className="item">
              <a href="/search" className="link flex">
                <i className="bx bx-grid-alt"></i>
                <span>Search</span>
              </a>
            </li>
            <li className="item">
              <a href="#" className="link flex">
                <i className="bx bxs-magic-wand"></i>
                <span>Playlists</span>
              </a>
            </li>
            <li className="item">
              <a href="#" className="link flex">
                <i className="bx bx-folder"></i>
                <span>Music-Library</span>
              </a>
            </li>
            <li className="item">
              <a href="#" className="link flex">
                <i className="bx bx-cloud-upload"></i>
                <span>Upload Music</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

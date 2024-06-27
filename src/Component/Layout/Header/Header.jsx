import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faAddressCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Load user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.removeItem('user'); // Example: Clear user info from localStorage
    // Additional logout logic as needed
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center togomain">
        <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className='togo' />
        </button>
        <Link to="Home">
          <img src="/images/plantify.png" alt="Plantify" className="navbar-logo" />
        </Link>
      </div>
      <div className="d-flex align-items-center">
        <ul className="nav-list">
          <li className="nav-item dropdown">
            <a href="/logout" className="nav-link">
              {user.image_name ? (
                <img src={`http://yourimagepath/${user.image_name}`} alt="User" className="user-image" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-primary" />
              )}
              <span>{user.displayName}</span>
            </a>
            <ul className="dropdown-content">
              <li className="dropdown-item">
                <Link to="/profile">
                  <FontAwesomeIcon icon={faAddressCard} /> <span>My Profile</span>
                </Link>
              </li>
              <li className="dropdown-item">
                <a href="/logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

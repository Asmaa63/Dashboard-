import React, { useEffect, useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      await axios.post('http://plantify.runasp.net/api/Dashboard/signout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('user'); // Clear user info from localStorage
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error appropriately
    }
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
            <a href="#!" className="nav-link">
              {user.image_name ? (
                <img src={user.image_name} alt="User" className="user-image" />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-primary" />
              )}
              <span>{user.displayName}</span>
            </a>
            <ul className="dropdown-content">
              <li className="dropdown-item">
                <a href="#!" onClick={handleLogout}>
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

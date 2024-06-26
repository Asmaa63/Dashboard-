import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserTie, faEnvelopeOpenText, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = ({ isVisible }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Load user info from localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleAdminMenu = () => setIsAdminMenuOpen(!isAdminMenuOpen);

  return (
    <nav className={`sidebar ${isVisible ? 'visible' : 'sidebar-offcanvas'}`} id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <div className="sidebar-profile">
            <p className="sidebar-designation">Welcome, {user.displayName}</p>
          </div>
        </li>
        <li className="sidebar-dash">
          <p className="sidebar-menu-title">Dash menu</p>
          <ul className="nav-sidebar">
            <li className="nav-item">
              <a className="nav-link" href="#auth" onClick={toggleUserMenu} aria-expanded={isUserMenuOpen}>
                <FontAwesomeIcon icon={faUsers} />
                <span className="menu-title">Users</span>
                <FontAwesomeIcon icon={isUserMenuOpen ? faArrowUp : faArrowDown} className='arrow' />
              </a>
              {isUserMenuOpen && (
                <div className="collapse show" id="auth">
                  <ul className="nav flex-column sub-menu nav-item-inside">
                    <li className="nav-item">
                      <Link className="nav-link" to="UserList">User List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="CreateUser">Create User</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#auth" onClick={toggleAdminMenu} aria-expanded={isAdminMenuOpen}>
                <FontAwesomeIcon icon={faUserTie} />
                <span className="menu-title">Admin</span>
                <FontAwesomeIcon icon={isAdminMenuOpen ? faArrowUp : faArrowDown} className='arrow' />
              </a>
              {isAdminMenuOpen && (
                <div className="collapse show" id="auth">
                  <ul className="nav flex-column sub-menu nav-item-inside">
                    <li className="nav-item">
                      <Link className="nav-link" to="ListAdmin">Admin List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="CreateAdmin">Create Admin</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-email" to="SendMail">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                <span className="menu-title">Send Introduction Email</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;

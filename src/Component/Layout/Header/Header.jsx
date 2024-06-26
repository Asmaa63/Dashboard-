import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'; // تأكد من استيراد faUser هنا
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  return (
    <nav className="navbar fixed-top d-flex justify-content-between">
      <div className="d-flex align-items-center togomain">
        <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className='togo' />
        </button>
        <Link to="/Home">
          <img src="/images/plantify.png" alt="Plantify" className="navbar-logo" />
        </Link>
      </div>
      <div className="d-flex align-items-center">
        <a href="/logout" className="nav-link">
          <FontAwesomeIcon icon={faUser} className="text-primary" />
          <p>User</p>
        </a>
      </div>
    </nav>
  );
};

export default Header;

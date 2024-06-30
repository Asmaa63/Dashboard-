import React, { useState } from 'react';
import './Layout.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from './../Footer/Footer';

const Layout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="container-scroller">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isVisible={isSidebarVisible} />
      <div className="container-fluid page-body-wrapper">
        <Main isSidebarVisible={isSidebarVisible} />
      </div>
      <div>
        {/* <Footer></Footer> */}
      </div>
    </div>
  );
}

export default Layout;

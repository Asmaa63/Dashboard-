import React from 'react';
import './Main.css';
import Home from '../../Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import List from '../../Pages/User/List/List';
import Edit from '../../Pages/User/Edit/Edit';
import Delete from '../../Pages/User/Delete/Delete';
import Create from '../../Pages/User/Create/Create';
import SendMail from '../../Pages/SendMail/SendMail';
import ListAdmin from '../../Pages/Admin/ListAdmin/ListAdmin';
import UpdateAdmin from '../../Pages/Admin/UpdateAdmin/UpdateAdmin';
import CreateAdmin from '../../Pages/Admin/Create/CreateAdmin';

const Main = ({ isSidebarVisible }) => {
  // Define the handleSendSuccess function
  const handleSendSuccess = (response) => {
    console.log('Email sent successfully:', response);
    // Handle success (e.g., navigate to another page, show notification, etc.)
  };

  return (
    <div className={`main-content ${isSidebarVisible ? 'with-sidebar' : ''}`}>
      <div className="container">
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/UserList' element={<List />} />
          <Route path='/EditUser' element={<Edit />} />
          <Route path='/DeleteUser' element={<Delete />} />
          <Route path='/CreateUser' element={<Create />} />
          <Route path='/SendMail' element={<SendMail onSendSuccess={handleSendSuccess} />} />
          <Route path='/ListAdmin' element={<ListAdmin />} />
          <Route path='/EditAdmin' element={<UpdateAdmin />} />
          <Route path='/CreateAdmin' element={<CreateAdmin />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;

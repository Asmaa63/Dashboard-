import React from 'react';
import './Main.css';
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import List from '../../Pages/User/List/List';
import EditUser from '../../Pages/User/Edit/Edit';
import Delete from '../../Pages/User/Delete/Delete';
import Create from '../../Pages/User/Create/Create';
import SendMail from '../../Pages/SendMail/SendMail';
import ListAdmin from '../../Pages/Admin/ListAdmin/ListAdmin';
import UpdateAdmin from '../../Pages/Admin/UpdateAdmin/UpdateAdmin';
import CreateAdmin from '../../Pages/Admin/Create/CreateAdmin';
import Message from '../../Pages/SendMail/Message/Message';
import EditAdmin from '../../Pages/Admin/UpdateAdmin/UpdateAdmin';
import SearchComponent from '../../Pages/User/Search/Search';
import Circle from '../../Pages/Earth/Circle';
import OptionImg from '../../Pages/OptionImage/OptionImage';
import OptionImage from '../../Pages/OptionImage/OptionImage';

const Main = ({ isSidebarVisible }) => {
  const handleSendSuccess = (response) => {
    console.log('Email sent successfully:', response);
  };

  return (
    <div className={`main-content ${isSidebarVisible ? 'with-sidebar' : ''}`}>
      <div className="container">
        <Routes>
          <Route path='Home' element={<Home></Home>} />
          <Route path='UserList' element={<List />} />
          <Route path='EditUser/:userId' element={<EditUser />} />
          <Route path='DeleteUser' element={<Delete />} />
          <Route path='CreateUser' element={<Create />} />
          <Route path='ListAdmin' element={<ListAdmin />} />
          <Route path='EditAdmin/:userId' element={<EditAdmin />} />
          <Route path='CreateAdmin' element={<CreateAdmin />} />
          <Route path='Message' element={<Message />} />
          <Route path='SendMail' element={<SendMail onSendSuccess={handleSendSuccess} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;

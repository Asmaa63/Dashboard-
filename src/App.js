import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'typicons.font/src/font/typicons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginPage from './Component/Login/Login';
import Layout from './Component/Layout/LayOut/Layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/DashboardMain/*' element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;

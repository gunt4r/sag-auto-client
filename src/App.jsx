import './App.css';
import HomePage from './pages/homePage/homePage.jsx';
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx';
import ProtectedRoute from "./components/ProtectAdmin/ProtectedRoute.jsx";
import CarDetail from "./pages/CarDetail/CarDetail.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={AdminDashboard} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

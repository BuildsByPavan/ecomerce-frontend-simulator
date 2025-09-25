// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderHistory from "./pages/Orderhistory";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import "./styles/main.css"
import GuestCart from "./pages/GuestCart";
function App() {
  const { user } = useAuthStore();

  return (
    <Router className="layout">
      <Navbar />
      
      <Routes className="content">
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/guest-cart" element={<GuestCart/>}/>
        <Route path="/orders" element={user ? <OrderHistory /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

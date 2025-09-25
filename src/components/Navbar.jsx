import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";
import "../styles/Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <h2>E-Commerce-Simulator</h2>

      {/* Hamburger button for mobile */}
      <span className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </span>

      <div className={`nav-links ${isOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

        {user ? (
          <>
            <Link to="/cart" onClick={() => setIsOpen(false)}><FaShoppingCart style={{ marginRight: "5px" }} />
            Cart ({totalQuantity})</Link>
            <Link to="/orders" onClick={() => setIsOpen(false)}>My Orders</Link>
            {user.role === "admin" && (
              <Link to="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
            )}
            <Link to="/profile" onClick={() => setIsOpen(false)}>User Profile</Link>
            <button onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

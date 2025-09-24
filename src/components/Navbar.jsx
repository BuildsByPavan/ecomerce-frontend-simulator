// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "../styles/Navbar.css";
import useCartStore from "../store/cartStore";
const Navbar = () => {
  const { user, logout } = useAuthStore();
  const {items} = useCartStore();
  const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  return (
    <nav>
      <h2>E-Commerce-Simulator</h2>
      <div>
        <Link to="/">Home</Link>{" | "}

        {user ? (
          <>
            <Link to="/cart">Cart ({totalQuantity})</Link>{" | "}
            <Link to="/orders">My Orders</Link>{" | "}
            {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}{" | "}
            <Link to="/profile">User Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>{" | "}
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
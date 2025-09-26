import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";
import useGuestCartStore from "../store/useGuestCartStore";
import "../styles/Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  // Get cart items based on user status
  const userItems = useCartStore((state) => state.items);
  const guestItems = useGuestCartStore((state) => state.items);
  const items = user ? userItems : guestItems;

  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Brand + Hamburger */}
      <div className="nav-brand">
        <h2>
          <Link to="/" onClick={() => setIsOpen(false)}>
            E-Commerce
          </Link>
        </h2>
        <span className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </span>
      </div>

      {/* Center: Links */}
      <div className={`nav-links ${isOpen ? "show" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>

        {user ? (
          <>
            <Link to="/orders" onClick={() => setIsOpen(false)}>
              My Orders
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                Admin Dashboard
              </Link>
            )}
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              User Profile
            </Link>
            {/* Desktop logout button */}
            <button className="logout-btn logout-desktop" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              Register
            </Link>
          </>
        )}
      </div>

      {/* Right: Cart + Mobile Logout */}
      <div className="nav-actions">
        <Link
          to={user ? "/cart" : "/guest-cart"}
          onClick={() => setIsOpen(false)}
          className="cart-link"
        >
          <FaShoppingCart size={26} />
          {totalQuantity > 0 && (
            <span className="cart-badge">{totalQuantity}</span>
          )}
        </Link>

        {user && (
          <button className="logout-btn logout-mobile" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

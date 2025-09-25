// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>© 2025 Ecom-Website. All rights reserved.</p>
      </div>

      {/* Internal navigation using Link */}
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* External social media links still use <a> */}
      <div>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;

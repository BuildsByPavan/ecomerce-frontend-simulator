// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css"
const Footer = () => {
  return (
    <footer>
      <div>
        <p>© 2025 Ecom-Website. All rights reserved.</p>
      </div>

      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>

      <div>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;

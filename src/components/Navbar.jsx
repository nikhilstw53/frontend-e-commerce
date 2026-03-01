import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="logo"
          className="nav-logo"
        />
        <h2>ShopZone</h2>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">My Cart</Link>
        <Link to="/login" className="nav-link login-btn">Login</Link>
      </div>
    </nav>
  );
}
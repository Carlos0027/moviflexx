import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">MF</span>
          MoviFlexx
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#about">Acerca de</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <Link to="/login" className="nav-link-login">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="nav-btn-register">
            Registrarse
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Features
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                Acerca de
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contacto
              </a>
            </li>
          </ul>
          <div className="mobile-auth">
            <Link
              to="/login"
              className="mobile-link-login"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="mobile-btn-register"
              onClick={() => setMenuOpen(false)}
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
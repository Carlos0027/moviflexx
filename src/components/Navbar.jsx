import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // 🔒 Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="logo-icon me-2">MF</span>
          <span className="logo-text">MoviFlexx</span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MENU */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

          {/* LINKS */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link px-3">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#features" className="nav-link px-3">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link px-3">
                Acerca de
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link px-3">
                Contacto
              </a>
            </li>
          </ul>

          {/* BOTONES AUTH */}
          <div className="d-flex flex-column flex-lg-row gap-2 align-items-stretch align-items-lg-center">
            <NavLink
              to="/login"
              className="btn btn-outline-primary px-4"
            >
              Iniciar Sesión
            </NavLink>

            <NavLink
              to="/register"
              className="btn btn-primary px-4"
            >
              Registrarse
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
}

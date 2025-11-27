import React from 'react';
import { Menu, X } from 'lucide-react';
import {     Link } from 'react-router-dom';
import "./Admin.css";
import EsperaImg from "../Imagenes/Waiting.png";
import UsuariosImg from "../Imagenes/Usuarios.jpg";
import VehiculosImg from "../Imagenes/vehiculo.png";
import ConductoresImg from "../Imagenes/conductores.png";
import Map from '../Imagenes/Map.png';

function Admin() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="admin-container">
      {/* Navbar */}
      <div className="admin-nav">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <span className="logo-icon">MF</span>
            MoviFlexx
          </Link>
          <div className="nav-auth">
            <Link to="/rutas" className="nav-btn-register">
                <div className="nav-icon">
                    <img src={Map} alt="Mapa" />
                </div>
                Ver Rutas
            </Link>
            <Link to="/" className="nav-link-login">
                Cerrar Sesión
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
      </div>

      {menuOpen && (
        <div>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Contenido de la página Admin */}
      <div className="admin-content">
        <h1>Panel de Administración</h1>
        <p>Este es el contenido exclusivo para administradores</p>
        
        {/* Grid de tarjetas */}
        <div className="admin-cards-grid">
          {/* Tarjeta de usuarios */}
          <div className="admin-card users">
            <div className="card-image">
              <img src={UsuariosImg} alt="Icono de usuarios" />
            </div>
            <h3>Lista de Usuarios registrados</h3>
            <div className="card-content">
              <p>Usuarios registrados: </p>
              <p>Usuarios activos hoy: </p>
              <p>Nuevos usuarios esta semana: </p>
            </div>
          </div>

          {/* Tarjeta de conductores */}
          <div className="admin-card drivers">
            <div className="card-image">
              <img src={ConductoresImg} alt="Icono de conductores" />
            </div>
            <h3>Lista de Conductores registrados</h3>
            <div className="card-content">
              <p>Conductores registrados: </p>
              <p>Conductores activos hoy: </p>
              <p>Nuevos conductores esta semana: 3</p>
            </div>
          </div>

          {/* Tarjeta de vehículos */}
          <div className="admin-card vehicles">
            <div className="card-image">
              <img src={VehiculosImg} alt="Icono de conductores" />
            </div>
            <h3>Lista de Vehículos registrados</h3>
            <div className="card-content">
              <p>Vehículos registrados: </p>
              <p>Vehículos activos hoy: </p>
              <p>Nuevos vehículos esta semana: </p>
            </div>
          </div>

          {/* Tarjeta de usuarios en espera */}
          <div className="admin-card waiting">
            <div className="card-image">
              <img src={EsperaImg} alt="Icono de conductores" />
            </div>
            <h3>Lista de Usuarios en espera</h3>
            <div className="card-content">
              <p>Usuarios en espera: 34</p>
              <p>Espera promedio: 5 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';
import "./Admin.css";
import EsperaImg from "../Imagenes/Waiting.png";
import UsuariosImg from "../Imagenes/Usuarios.jpg";
import VehiculosImg from "../Imagenes/vehiculo.png";
import ConductoresImg from "../Imagenes/conductores.png";
import Map from '../Imagenes/Map.png';

function Admin() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleUsersClick = () => {
    navigate('/admin/usuarios');
  };

  const handleDriversClick = () => {
    navigate('/admin/conductores');
  };

  const handleVehiclesClick = () => {
    navigate('/admin/vehiculos');
  };

  const handleWaitingClick = () => {
    navigate('/admin/espera');
  };
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
            <Link to="/" className="nav-link-login">
                Cerrar Sesión
            </Link>
        </div>
        </div>
      </div>

      {/* Contenido de la página Admin */}
      <div className="admin-content">
        <h1>Panel de Administración</h1>
        <p>Este es el contenido exclusivo para administradores</p>
        
        {/* Grid de tarjetas */}
        <div className="admin-cards-grid">
          {/* Tarjeta de usuarios */}
          <div className="admin-card users" onClick={handleUsersClick}>
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
          <div className="admin-card drivers" onClick={handleDriversClick}>
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
          <div className="admin-card vehicles" onClick={handleVehiclesClick}>
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
        </div>
      </div>
    </div>
  );
}

export default Admin;
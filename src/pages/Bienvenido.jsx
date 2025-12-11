import React from 'react';
import { Users, Car, Zap, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./Bienvenido.css";
import "./Admin/Admin"

export default function Bienvenido() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">

        <div className="welcome-header">
          <h1>Panel de Administración 👑</h1>
          <p>Gestiona usuarios, rutas, vehículos y más</p>
        </div>

        <div className="welcome-grid">

          <div className="welcome-card">
            <Users size={48} />
            <h3>Usuarios</h3>
            <p>Gestiona pasajeros, conductores y permisos</p>
          </div>

          <div className="welcome-card">
            <Car size={48} />
            <h3>Vehículos</h3>
            <p>Administra la información de los autos registrados</p>
          </div>

          <div className="welcome-card">
            <MapPin size={48} />
            <h3>Rutas</h3>
            <p>Control y edición de rutas activas</p>
          </div>

          <div className="welcome-card">
            <Zap size={48} />
            <h3>Reportes</h3>
            <p>Ver estadísticas de uso y actividad del sistema</p>
          </div>

        </div>

        <Link to="/admin" className="welcome-button">
          Ir al Panel
          <ArrowRight size={20} />
        </Link>

      </div>
    </div>
  );
}

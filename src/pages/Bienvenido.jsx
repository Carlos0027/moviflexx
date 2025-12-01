import React, { useEffect, useState } from 'react';
import { Users, Car, Zap, MapPin, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import "./Bienvenido.css";

export default function Bienvenido() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserName(userData.fullName || 'Usuario');
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserName('Usuario');
      }
    } else {
      // Si no hay usuario, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-content">

        <div className="welcome-header">
          <h1>Bienvenido a MoviFlexx, {userName}! 🎉</h1>
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

        <Link to="/dashboard" className="welcome-button">
          Ir al Panel
          <ArrowRight size={20} />
        </Link>

      </div>
    </div>
  );
}
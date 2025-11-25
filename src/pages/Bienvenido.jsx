import React from 'react';
import { MapPin, Users, Car, Zap, ArrowRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import "./Bienvenido.css";

export default function Bienvenido() {
  const rol = 'pasajero'; // O 'conductor' según el usuario

  if (rol === 'pasajero') {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <div className="welcome-header">
            <h1>¡Bienvenido a MoviFlexx! 👋</h1>
            <p>Como pasajero, aquí puedes encontrar viajes compartidos seguros y económicos</p>
          </div>

          <div className="welcome-grid">
            <div className="welcome-card">
              <MapPin size={48} />
              <h3>Busca Rutas</h3>
              <p>Ingresa tu origen y destino para encontrar viajes disponibles</p>
            </div>

            <div className="welcome-card">
              <Users size={48} />
              <h3>Ve Conductores</h3>
              <p>Revisa perfil, calificaciones y reseñas de conductores</p>
            </div>

            <div className="welcome-card">
              <Zap size={48} />
              <h3>Reserva Fácil</h3>
              <p>Elige un asiento y completa la reserva en segundos</p>
            </div>

            <div className="welcome-card">
              <Car size={48} />
              <h3>¡Disfruta!</h3>
              <p>Viaja compartido, ahorra dinero y haz nuevos amigos</p>
            </div>
          </div>

          <Link to="/" className="welcome-button">
            Comenzar a Buscar Viajes
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header">
          <h1>¡Bienvenido Conductor! 🚗</h1>
          <p>Comparte tu ruta fija con pasajeros y ahorra en gastos de viaje</p>
        </div>

        <div className="welcome-grid">
          <div className="welcome-card">
            <MapPin size={48} />
            <h3>Crea tu Ruta</h3>
            <p>Define tu ruta fija de inicio a fin con horarios regulares</p>
          </div>

          <div className="welcome-card">
            <Users size={48} />
            <h3>Acepta Pasajeros</h3>
            <p>Revisa solicitudes y acepta pasajeros verificados</p>
          </div>

          <div className="welcome-card">
            <Zap size={48} />
            <h3>Fija tus Precios</h3>
            <p>Define el precio por asiento según tu ruta y gastos</p>
          </div>

          <div className="welcome-card">
            <Car size={48} />
            <h3>Gana Dinero</h3>
            <p>Recupera gastos compartiendo tu viaje con pasajeros</p>
          </div>
        </div>

        <Link to="/" className="welcome-button">
          Crear tu Primer Viaje
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
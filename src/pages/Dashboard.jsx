import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'MV-9',
      title: 'Solicitud de Viaje',
      description: 'Sistema de solicitud y aprobación de viajes',
      icon: '✈️',
      path: '/solicitud-viaje',
      status: 'Completado'
    },
    {
      id: 'MV-10',
      title: 'Optimización de Rutas',
      description: 'Algoritmo para optimizar rutas de viaje',
      icon: '🗺️',
      path: '/optimizacion-rutas',
      status: 'Completado'
    },
    {
      id: 'MV-11',
      title: 'Viaje Compartido',
      description: 'Plataforma para compartir viajes entre usuarios',
      icon: '🚗',
      path: '/viaje-compartido',
      status: 'Completado'
    },
    {
      id: 'MV-12',
      title: 'Validación de Documentación',
      description: 'Sistema de validación de documentos de viaje',
      icon: '📋',
      path: '/validacion-documentos',
      status: 'Completado'
    },
    {
      id: 'MV-30',
      title: 'Contacto con Soporte Técnico',
      description: 'Sistema de tickets y soporte técnico',
      icon: '🛠️',
      path: '/soporte-tecnico',
      status: 'Completado'
    },
    {
      id: 'MV-35',
      title: 'Reportes Automáticos',
      description: 'Generación y programación de reportes',
      icon: '📊',
      path: '/reportes-automaticos',
      status: 'Completado'
    },
    {
      id: 'MV-36',
      title: 'Chat Interno Cifrado',
      description: 'Sistema de mensajería segura para equipos',
      icon: '💬',
      path: '/chat-interno',
      status: 'Completado'
    },
    {
      id: 'MV-50',
      title: 'Seguimiento de Conversaciones',
      description: 'Gestión y seguimiento de conversaciones',
      icon: '💭',
      path: '/seguimiento-conversaciones',
      status: 'Completado'
    },
    {
      id: 'MV-51',
      title: 'Notificaciones de Tickets',
      description: 'Sistema de alertas y notificaciones',
      icon: '🔔',
      path: '/notificaciones-tickets',
      status: 'Completado'
    }
  ];

  const handleModuleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>🚗 MoviFlex - Sistema de Viajes</h1>
            <p className="dashboard-subtitle">Plataforma integral de gestión corporativa de viajes</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{modules.length}</span>
              <span className="stat-label">Módulos</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {modules.filter(m => m.status === 'Por hacer').length}
              </span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {modules.filter(m => m.status === 'Completado').length}
              </span>
              <span className="stat-label">Completados</span>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="modules-grid">
          {modules.map((module) => (
            <div 
              key={module.id}
              className="module-card"
              onClick={() => handleModuleClick(module.path)}
            >
              <div className="module-icon">{module.icon}</div>
              <div className="module-content">
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
                <div className="module-meta">
                  <span className="module-id">{module.id}</span>
                  <span className={`module-status ${module.status.toLowerCase().replace(' ', '-')}`}>
                    {module.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>🚀 MoviFlex - Plataforma de Gestión de Viajes Corporativos</p>
          <div className="footer-links">
            <span>Versión 1.0</span>
            <span>•</span>
            <span>Desarrollo Activo</span>
            <span>•</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
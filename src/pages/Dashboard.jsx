{/*import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, Bell, Menu, X } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userData, setUserData] = useState({ fullName: "Usuario", role: "pasajero" });

  // Obtener datos del usuario desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserData(parsed);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      // Si no hay usuario, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  const userName = userData.fullName || "Usuario";
  const userRole = userData.role || "pasajero";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  const handleProfile = () => {
    console.log("Navegando a perfil...");
    setShowUserMenu(false);
    navigate('/perfil');
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate('/configuracion');
  };

  const pendingCount = modules.filter(m => m.status === 'Por hacer').length;
  const completedCount = modules.filter(m => m.status === 'Completado').length;

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <span className="brand-icon">🚗</span>
            <span className="brand-name">MoviFlexx</span>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`navbar-menu ${showMobileMenu ? 'active' : ''}`}>
            <div className="navbar-links">
              <a href="/dashboard" className="nav-link active">
                Dashboard
              </a>
              <a href="/mis-viajes" className="nav-link">
                Mis Viajes
              </a>
              {userRole === 'conductor' && (
                <a href="/mis-rutas" className="nav-link">
                  Mis Rutas
                </a>
              )}
              <a href="/historial" className="nav-link">
                Historial
              </a>
            </div>

            <div className="navbar-actions">
              <button className="navbar-icon-btn" title="Notificaciones" aria-label="Notificaciones">
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>

              <div className="user-menu-container">
                <button 
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="Menú de usuario"
                  aria-expanded={showUserMenu}
                >
                  <div className="user-avatar">
                    <User size={18} />
                  </div>
                  <span className="user-name">{userName}</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="dropdown-user-info">
                        <p className="dropdown-user-name">{userName}</p>
                        <p className="dropdown-user-role">
                          {userRole === 'conductor' ? '🚗 Conductor' : '👤 Pasajero'}
                        </p>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleProfile}>
                      <User size={16} />
                      <span>Ver Perfil</span>
                    </button>
                    <button className="dropdown-item" onClick={handleSettings}>
                      <Settings size={16} />
                      <span>Configuración</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

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
              <span className="stat-number">{pendingCount}</span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="stat">
              <span className="stat-number">{completedCount}</span>
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleModuleClick(module.path);
                }
              }}
            >
              <div className="module-icon" aria-hidden="true">{module.icon}</div>
              <div className="module-content">
                <h3 className="module-title">{module.title}</h3>
                <p className="module-description">{module.description}</p>
                <div className="module-meta">
                  <span className="module-id">{module.id}</span>
                  <span className={`module-status ${module.status.toLowerCase().replace(/\s+/g, '-')}`}>
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
            <span aria-hidden="true">•</span>
            <span>Desarrollo Activo</span>
            <span aria-hidden="true">•</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      {(showUserMenu || showMobileMenu) && (
        <div 
          className="menu-overlay"
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;*/}
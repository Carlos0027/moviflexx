import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, Bell, Menu, X, Home, MapPin, Clock } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userData, setUserData] = useState({ 
    nombres: "Usuario", 
    apellidos: "",
    rolId: 2 
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalModulos: 9,
    pendientes: 0,
    completados: 9
  });

  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        // Obtener datos del usuario
        const respuesta = await fetch("http://localhost:4000/api/usuario/perfil", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!respuesta.ok) {
          throw new Error('No autenticado');
        }

        const data = await respuesta.json();
        setUserData(data);

        // Obtener estadísticas del dashboard
        await obtenerEstadisticasDashboard(token);
        
        setLoading(false);

      } catch (error) {
        console.error("Error al verificar usuario:", error);
        navigate('/login');
      }
    };

    const obtenerEstadisticasDashboard = async (token) => {
      try {
        const respuesta = await fetch("http://localhost:4000/api/dashboard/estadisticas", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (respuesta.ok) {
          const data = await respuesta.json();
          setStats({
            totalModulos: data.totalModulos || 9,
            pendientes: data.pendientes || 0,
            completados: data.completados || 9
          });
        }
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    verificarUsuario();
  }, [navigate]);

  const userName = `${userData.nombres || ''} ${userData.apellidos || ''}`.trim() || "Usuario";
  const userRole = userData.rolId === 3 ? 'conductor' : userData.rolId === 2 ? 'pasajero' : 'admin';

  const modules = [
    {
      id: 'MV-9',
      title: 'Solicitud de Viaje',
      description: 'Sistema de solicitud y aprobación de viajes',
      icon: '✈️',
      path: '/solicitud-viaje',
      status: 'Completado',
      color: 'primary'
    },
    {
      id: 'MV-10',
      title: 'Optimización de Rutas',
      description: 'Algoritmo para optimizar rutas de viaje',
      icon: '🗺️',
      path: '/optimizacion-rutas',
      status: 'Completado',
      color: 'success'
    },
    {
      id: 'MV-11',
      title: 'Viaje Compartido',
      description: 'Plataforma para compartir viajes entre usuarios',
      icon: '🚗',
      path: '/viaje-compartido',
      status: 'Completado',
      color: 'warning'
    },
    {
      id: 'MV-12',
      title: 'Validación de Documentación',
      description: 'Sistema de validación de documentos de viaje',
      icon: '📋',
      path: '/validacion-documentos',
      status: 'Completado',
      color: 'info'
    },
    {
      id: 'MV-30',
      title: 'Contacto con Soporte Técnico',
      description: 'Sistema de tickets y soporte técnico',
      icon: '🛠️',
      path: '/soporte-tecnico',
      status: 'Completado',
      color: 'danger'
    },
    {
      id: 'MV-35',
      title: 'Reportes Automáticos',
      description: 'Generación y programación de reportes',
      icon: '📊',
      path: '/reportes-automaticos',
      status: 'Completado',
      color: 'secondary'
    },
    {
      id: 'MV-36',
      title: 'Chat Interno Cifrado',
      description: 'Sistema de mensajería segura para equipos',
      icon: '💬',
      path: '/chat-interno',
      status: 'Completado',
      color: 'primary'
    },
    {
      id: 'MV-50',
      title: 'Seguimiento de Conversaciones',
      description: 'Gestión y seguimiento de conversaciones',
      icon: '💭',
      path: '/seguimiento-conversaciones',
      status: 'Completado',
      color: 'success'
    },
    {
      id: 'MV-51',
      title: 'Notificaciones de Tickets',
      description: 'Sistema de alertas y notificaciones',
      icon: '🔔',
      path: '/notificaciones-tickets',
      status: 'Completado',
      color: 'warning'
    }
  ];

  const handleModuleClick = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Opcional: Llamar a endpoint de logout en el backend
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("token");
      navigate('/login');
    }
  };

  const handleProfile = () => {
    setShowUserMenu(false);
    navigate('/perfil');
  };

  const handleSettings = () => {
    setShowUserMenu(false);
    navigate('/configuracion');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navbar con Bootstrap */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-purple sticky-top shadow">
        <div className="container-fluid px-4">
          <a className="navbar-brand d-flex align-items-center" href="/dashboard">
            <span className="brand-icon me-2">🚗</span>
            <span className="fw-bold">MoviFlexx</span>
          </a>

          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <Menu size={24} />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/dashboard">
                  <Home size={18} className="me-1" />
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mis-viajes">
                  <MapPin size={18} className="me-1" />
                  Mis Viajes
                </a>
              </li>
              {userRole === 'conductor' && (
                <li className="nav-item">
                  <a className="nav-link" href="/mis-rutas">
                    <MapPin size={18} className="me-1" />
                    Mis Rutas
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="/historial">
                  <Clock size={18} className="me-1" />
                  Historial
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              {/* Notificaciones */}
              <div className="position-relative">
                <button className="btn btn-icon text-white">
                  <Bell size={20} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
              </div>

              {/* User Dropdown */}
              <div className="dropdown">
                <button 
                  className="btn btn-user d-flex align-items-center gap-2 dropdown-toggle"
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}>
                  <div className="user-avatar-small">
                    <User size={18} />
                  </div>
                  <span className="d-none d-lg-inline text-white">{userName}</span>
                </button>
                
                {showUserMenu && (
                  <div className="dropdown-menu dropdown-menu-end show" style={{ right: 0, left: 'auto' }}>
                    <div className="dropdown-header">
                      <strong>{userName}</strong>
                      <small className="d-block text-muted">
                        {userRole === 'conductor' ? '🚗 Conductor' : userRole === 'admin' ? '👑 Admin' : '👤 Pasajero'}
                      </small>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleProfile}>
                      <User size={16} className="me-2" />
                      Ver Perfil
                    </button>
                    <button className="dropdown-item" onClick={handleSettings}>
                      <Settings size={16} className="me-2" />
                      Configuración
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <LogOut size={16} className="me-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="dashboard-header py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold text-white mb-2">🚗 MoviFlexx - Sistema de Viajes</h1>
              <p className="lead text-white-50">Plataforma integral de gestión corporativa de viajes</p>
            </div>
            <div className="col-lg-4">
              <div className="row g-3">
                <div className="col-4">
                  <div className="stat-card-small text-center">
                    <div className="stat-number">{stats.totalModulos}</div>
                    <div className="stat-label">Módulos</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card-small text-center">
                    <div className="stat-number">{stats.pendientes}</div>
                    <div className="stat-label">Pendientes</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card-small text-center">
                    <div className="stat-number">{stats.completados}</div>
                    <div className="stat-label">Completados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main py-5">
        <div className="container">
          <div className="row g-4">
            {modules.map((module) => (
              <div key={module.id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className={`module-card-bootstrap border-${module.color}`}
                  onClick={() => handleModuleClick(module.path)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="card-body">
                    <div className={`module-icon-bootstrap bg-${module.color}-subtle text-${module.color}`}>
                      {module.icon}
                    </div>
                    <h5 className="card-title mt-3 mb-2">{module.title}</h5>
                    <p className="card-text text-muted small">{module.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="badge bg-secondary">{module.id}</span>
                      <span className={`badge bg-${module.color}`}>{module.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer py-4 bg-light border-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0 text-muted">🚀 MoviFlexx - Plataforma de Gestión de Viajes Corporativos</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="text-muted small">
                Versión 1.0 • Desarrollo Activo • {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlay para cerrar menús */}
      {showUserMenu && (
        <div 
          className="menu-overlay"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
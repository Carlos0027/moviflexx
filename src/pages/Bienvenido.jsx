import React, { useEffect, useState } from 'react';
import { Users, Car, Zap, MapPin, ArrowRight, Settings, TrendingUp, Shield, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Bienvenido.css";
import "./Admin/Admin"

export default function Bienvenido() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Usuario');
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    viajesCompletados: 0,
    rutasActivas: 0,
    calificacion: '5.0',
    tiempoAhorrado: '0h'
  });

  useEffect(() => {
    // Verificar autenticación y obtener datos del usuario
    const verificarUsuario = async () => {
      try {
        // Obtener el token del contexto de autenticación o localStorage temporal
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        // Llamada a la API para obtener datos del usuario
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
        
        // Configurar nombre completo
        const fullName = `${data.nombres || ''} ${data.apellidos || ''}`.trim() || data.nombreUsuario || 'Usuario';
        setUserName(fullName);
        
        // Determinar rol del usuario
        if (data.rolId === 3) {
          setUserRole('Conductor');
        } else if (data.rolId === 2) {
          setUserRole('Pasajero');
        } else if (data.rolId === 1) {
          setUserRole('Administrador');
        } else {
          setUserRole('Usuario');
        }

        // Obtener estadísticas del usuario
        await obtenerEstadisticas(token, data.idUsuariosSistema);
        
        setLoading(false);

      } catch (error) {
        console.error("Error al verificar usuario:", error);
        navigate('/login');
      }
    };

    const obtenerEstadisticas = async (token, userId) => {
      try {
        const respuesta = await fetch(`http://localhost:4000/api/usuario/${userId}/estadisticas`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (respuesta.ok) {
          const data = await respuesta.json();
          setStats({
            viajesCompletados: data.viajesCompletados || 0,
            rutasActivas: data.rutasActivas || 0,
            calificacion: data.calificacionPromedio?.toFixed(1) || '5.0',
            tiempoAhorrado: `${data.tiempoAhorrado || 0}h`
          });
        }
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        // Mantener valores por defecto
      }
    };

    verificarUsuario();
  }, [navigate]);

  const statsData = [
    { label: 'Viajes Completados', value: stats.viajesCompletados, icon: <Car size={24} />, color: 'primary' },
    { label: 'Rutas Activas', value: stats.rutasActivas, icon: <MapPin size={24} />, color: 'success' },
    { label: 'Calificación', value: stats.calificacion, icon: <TrendingUp size={24} />, color: 'warning' },
    { label: 'Tiempo Ahorrado', value: stats.tiempoAhorrado, icon: <Clock size={24} />, color: 'info' }
  ];

  const features = [
    {
      icon: <Users size={48} />,
      title: 'Usuarios',
      description: 'Gestiona pasajeros, conductores y permisos',
      color: 'primary',
      link: '/usuarios'
    },
    {
      icon: <Car size={48} />,
      title: 'Vehículos',
      description: 'Administra la información de los autos registrados',
      color: 'success',
      link: '/vehiculos'
    },
    {
      icon: <MapPin size={48} />,
      title: 'Rutas',
      description: 'Control y edición de rutas activas',
      color: 'warning',
      link: '/rutas'
    },
    {
      icon: <Zap size={48} />,
      title: 'Reportes',
      description: 'Ver estadísticas de uso y actividad del sistema',
      color: 'danger',
      link: '/reportes'
    },
    {
      icon: <Shield size={48} />,
      title: 'Seguridad',
      description: 'Configuración de permisos y privacidad',
      color: 'info',
      link: '/seguridad'
    },
    {
      icon: <Settings size={48} />,
      title: 'Configuración',
      description: 'Ajustes generales del sistema',
      color: 'secondary',
      link: '/configuracion'
    }
  ];

  if (loading) {
    return (
      <div className="welcome-container">
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-white mt-3">Cargando información...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="container py-5">
        
        {/* Header con Badge */}
        <div className="welcome-header text-center mb-5">
          <div className="mb-3">
            <span className="badge bg-gradient-purple px-4 py-2 rounded-pill">
              {userRole}
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-3">
            ¡Bienvenido a MoviFlexx, <span className="text-gradient">{userName}</span>! 🎉
          </h1>
          <p className="lead text-muted">
            Gestiona usuarios, rutas, vehículos y más desde tu panel de control
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          {statsData.map((stat, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className={`stat-card bg-${stat.color}-subtle border-${stat.color}`}>
                <div className={`stat-icon text-${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="row g-4 mb-5">
          {features.map((feature, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Link to={feature.link} className="text-decoration-none">
                <div className={`welcome-card border-${feature.color}`}>
                  <div className={`card-icon-wrapper bg-${feature.color}-subtle`}>
                    <div className={`card-icon text-${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{feature.title}</h3>
                    <p className="card-description">{feature.description}</p>
                  </div>
                  <div className={`card-arrow text-${feature.color}`}>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="cta-section text-center">
          <div className="cta-content">
            <h2 className="cta-title mb-3">¿Listo para comenzar?</h2>
            <p className="cta-description mb-4">
              Accede a tu panel de control y gestiona todos los aspectos de MoviFlexx
            </p>
            <Link to="/dashboard" className="btn btn-lg btn-gradient-purple px-5 py-3">
              Ir al Panel de Control
              <ArrowRight size={20} className="ms-2" />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
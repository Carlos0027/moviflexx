import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Edit2, Save, X, 
  Car, MapPin, Star, Award, Clock, TrendingUp,
  ArrowLeft, Settings, Shield, FileText, CheckCircle,
  Activity, Target, Zap, Camera, Upload
} from 'lucide-react';
import './Perfil.css';

export default function Perfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserData(parsed);
        setEditedData(parsed);
        setProfileImage(parsed.profileImage || null);
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setProfileImage(userData.profileImage || null);
    setIsEditing(false);
  };

  const handleSave = () => {
    try {
      const updatedData = {
        ...editedData,
        profileImage: profileImage
      };
      
      localStorage.setItem('user', JSON.stringify(updatedData));
      setUserData(updatedData);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      alert('Error al guardar los cambios');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [name]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen debe ser menor a 2MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten imágenes');
        return;
      }

      // Convertir a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  if (!userData) {
    return (
      <div className="perfil-loading">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Cargando perfil...</p>
      </div>
    );
  }

  const isDriver = userData.role === 'conductor';

  return (
    <div className="perfil-page">
      {/* Success notification */}
      {showSuccess && (
        <div className="success-notification">
          <CheckCircle size={20} />
          <span>Perfil actualizado correctamente</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="perfil-topbar">
        <div className="topbar-container">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={20} />
            <span>Volver al Dashboard</span>
          </button>
          <div className="topbar-actions">
            {!isEditing ? (
              <button className="edit-btn" onClick={handleEdit}>
                <Edit2 size={18} />
                <span>Editar Perfil</span>
              </button>
            ) : (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  <Save size={18} />
                  <span>Guardar</span>
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <X size={18} />
                  <span>Cancelar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="perfil-container">
        {/* Profile Header Card */}
        <div className="profile-banner">
          <div className="banner-gradient"></div>
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                {/* Input oculto para subir imagen */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                
                <div 
                  className={`avatar-circle ${isEditing ? 'editable' : ''}`}
                  onClick={handleImageClick}
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="avatar-image" />
                  ) : (
                    <span className="avatar-emoji">{isDriver ? '🚗' : '👤'}</span>
                  )}
                  
                  {isEditing && (
                    <div className="avatar-overlay">
                      <Camera size={28} />
                      <span>Cambiar foto</span>
                    </div>
                  )}
                </div>
                
                <div className="avatar-badge">
                  {isDriver ? <Car size={16} /> : <User size={16} />}
                </div>

                {/* Botón para eliminar foto */}
                {isEditing && profileImage && (
                  <button className="remove-image-btn" onClick={removeImage}>
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{userData.fullName}</h1>
                <div className="profile-role">
                  <Shield size={16} />
                  <span>{isDriver ? 'Conductor Verificado' : 'Pasajero Activo'}</span>
                </div>
                <div className="profile-meta">
                  <Calendar size={14} />
                  <span>Miembro desde {new Date(userData.createdAt).toLocaleDateString('es-ES', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="quick-stat">
                <Activity size={20} />
                <div>
                  <span className="stat-value">{isDriver ? '47' : '23'}</span>
                  <span className="stat-label">Viajes</span>
                </div>
              </div>
              <div className="quick-stat">
                <Star size={20} />
                <div>
                  <span className="stat-value">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
              <div className="quick-stat">
                <Target size={20} />
                <div>
                  <span className="stat-value">{isDriver ? '156' : '89'}</span>
                  <span className="stat-label">Puntos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="profile-content-grid">
          {/* Left Column */}
          <div className="profile-column profile-column-left">
            
            {/* Personal Information Card */}
            <div className="info-card">
              <div className="card-header">
                <div className="card-title">
                  <User size={22} />
                  <h2>Información Personal</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <div className="info-icon">
                    <Mail size={18} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Correo Electrónico</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        className="info-input"
                        value={editedData.email || ''}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com"
                      />
                    ) : (
                      <p className="info-text">{userData.email}</p>
                    )}
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon">
                    <Phone size={18} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Teléfono</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        className="info-input"
                        value={editedData.phone || ''}
                        onChange={handleChange}
                        placeholder="+57 300 000 0000"
                      />
                    ) : (
                      <p className="info-text">{userData.phone || 'No especificado'}</p>
                    )}
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon">
                    <Shield size={18} />
                  </div>
                  <div className="info-content">
                    <label className="info-label">Rol en la plataforma</label>
                    <p className="info-text">
                      <span className="role-tag">{isDriver ? '🚗 Conductor' : '👤 Pasajero'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information (Drivers Only) */}
            {isDriver && userData.vehicle && (
              <div className="info-card vehicle-card">
                <div className="card-header">
                  <div className="card-title">
                    <Car size={22} />
                    <h2>Información del Vehículo</h2>
                  </div>
                </div>
                <div className="card-body">
                  <div className="vehicle-showcase">
                    <div className="vehicle-icon-large">🚗</div>
                    <div className="vehicle-main-info">
                      {isEditing ? (
                        <div className="vehicle-edit-group">
                          <input
                            type="text"
                            name="brand"
                            className="info-input"
                            value={editedData.vehicle?.brand || ''}
                            onChange={handleVehicleChange}
                            placeholder="Marca"
                          />
                          <input
                            type="text"
                            name="model"
                            className="info-input"
                            value={editedData.vehicle?.model || ''}
                            onChange={handleVehicleChange}
                            placeholder="Modelo"
                          />
                        </div>
                      ) : (
                        <h3 className="vehicle-name">{userData.vehicle.brand} {userData.vehicle.model}</h3>
                      )}
                      
                      {isEditing ? (
                        <input
                          type="text"
                          name="licensePlate"
                          className="info-input license-input"
                          value={editedData.vehicle?.licensePlate || ''}
                          onChange={handleVehicleChange}
                          placeholder="ABC123"
                        />
                      ) : (
                        <div className="license-plate">{userData.vehicle.licensePlate}</div>
                      )}
                    </div>
                  </div>

                  <div className="vehicle-specs">
                    <div className="spec-item">
                      <label>Año</label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="year"
                          className="info-input"
                          value={editedData.vehicle?.year || ''}
                          onChange={handleVehicleChange}
                          min="1990"
                          max="2025"
                        />
                      ) : (
                        <span>{userData.vehicle.year}</span>
                      )}
                    </div>
                    <div className="spec-item">
                      <label>Color</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="color"
                          className="info-input"
                          value={editedData.vehicle?.color || ''}
                          onChange={handleVehicleChange}
                        />
                      ) : (
                        <span>{userData.vehicle.color}</span>
                      )}
                    </div>
                    <div className="spec-item">
                      <label>Capacidad</label>
                      {isEditing ? (
                        <select
                          name="capacity"
                          className="info-input"
                          value={editedData.vehicle?.capacity || '4'}
                          onChange={handleVehicleChange}
                        >
                          <option value="2">2 pasajeros</option>
                          <option value="3">3 pasajeros</option>
                          <option value="4">4 pasajeros</option>
                          <option value="5">5 pasajeros</option>
                          <option value="6">6 pasajeros</option>
                        </select>
                      ) : (
                        <span>{userData.vehicle.capacity} pasajeros</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="profile-column profile-column-right">
            
            {/* Statistics Card */}
            <div className="info-card stats-card">
              <div className="card-header">
                <div className="card-title">
                  <TrendingUp size={22} />
                  <h2>Estadísticas y Logros</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="stats-grid-modern">
                  <div className="stat-card">
                    <div className="stat-icon-wrapper blue">
                      <MapPin size={24} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{isDriver ? '47' : '23'}</span>
                      <span className="stat-text">{isDriver ? 'Viajes realizados' : 'Viajes tomados'}</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon-wrapper yellow">
                      <Star size={24} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">4.8</span>
                      <span className="stat-text">Calificación promedio</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon-wrapper green">
                      <Award size={24} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{isDriver ? '156' : '89'}</span>
                      <span className="stat-text">Puntos acumulados</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon-wrapper purple">
                      <Clock size={24} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-number">{isDriver ? '94' : '76'}</span>
                      <span className="stat-text">Horas ahorradas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Card */}
            <div className="info-card">
              <div className="card-header">
                <div className="card-title">
                  <FileText size={22} />
                  <h2>Actividad Reciente</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="empty-state-modern">
                  <div className="empty-icon">
                    <Activity size={48} />
                  </div>
                  <h3>No hay actividad reciente</h3>
                  <p>
                    {isDriver 
                      ? 'Publica tu primera ruta para comenzar a recibir solicitudes' 
                      : 'Reserva tu primer viaje para ver tu actividad aquí'}
                  </p>
                  <button className="cta-button">
                    <Zap size={18} />
                    {isDriver ? 'Publicar Ruta' : 'Buscar Viajes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
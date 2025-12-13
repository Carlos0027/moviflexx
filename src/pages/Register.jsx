import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, Car, Hash, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    nombreUsuario: '',
    correo: '',
    telefono: '',
    contrasenaHash: '',
    confirmPassword: '',
    rolId: 2,
    acceptTerms: false,
    // Datos del vehículo (solo para conductores)
    placa: '',
    modelo: '',
    anio: '',
    marca: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!selectedRole) {
      setError('Por favor selecciona un rol');
      return false;
    }
    if (!formData.nombres || !formData.apellidos || !formData.nombreUsuario || !formData.correo || !formData.contrasenaHash || !formData.confirmPassword) {
      setError('Por favor completa todos los campos obligatorios');
      return false;
    }
    if (formData.contrasenaHash !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.contrasenaHash.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    
    if (selectedRole === 'conductor') {
      if (!formData.placa || !formData.modelo || !formData.anio || !formData.marca) {
        setError('Por favor completa todos los datos del vehículo');
        return false;
      }
    }
    
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Preparar datos según tu esquema de backend
      const userData = {
        nombreUsuario: formData.nombreUsuario,
        contrasenaHash: formData.contrasenaHash,
        correo: formData.correo,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        rolId: selectedRole === 'conductor' ? 3 : 2,
        telefono: formData.telefono
      };

      // Agregar datos del vehículo si es conductor
      if (selectedRole === 'conductor') {
        userData.vehiculo = {
          placa: formData.placa,
          modelo: formData.modelo,
          anio: parseInt(formData.anio),
          marca: formData.marca
        };
      }

      const respuesta = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setError(data.message || 'Error al crear la cuenta');
        setLoading(false);
        return;
      }

      console.log("✅ Usuario registrado:", data);
      
      setSuccess(true);
      setLoading(false);

      // Redirigir al Login después de 2s
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error("❌ Error al registrar:", error);
      setError('Error de conexión. Verifica que el servidor esté activo.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="register-container">
        <div className="success-message">
          <CheckCircle size={80} className="success-icon" />
          <h2>¡Registro Exitoso!</h2>
          <p>Tu cuenta ha sido creada correctamente</p>
          {selectedRole === 'conductor' && (
            <p className="vehicle-info">
              Vehículo registrado: {formData.marca} {formData.modelo}
            </p>
          )}
          <p className="redirect-text">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">

        {/* Left Info */}
        <div className="register-info">
          <div className="info-content">
            <h1>Únete a MoviFlexx</h1>
            <p>La comunidad de viajes compartidos más segura</p>

            <div className="info-features">
              <div className="info-item">
                <span className="icon">🔒</span>
                <div>
                  <h3>Seguridad Verificada</h3>
                  <p>Todos los usuarios verificados</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">💰</span>
                <div>
                  <h3>Ahorra Dinero</h3>
                  <p>Comparte gastos de viaje</p>
                </div>
              </div>
              <div className="info-item">
                <span className="icon">🤝</span>
                <div>
                  <h3>Comunidad</h3>
                  <p>Conecta con viajeros de tu zona</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="register-form-container">
          <div className="form-content">
            <h2>Crear Cuenta</h2>
            <p className="subtitle">Completa el formulario para comenzar</p>

            {error && <div className="error-message">{error}</div>}

            {/* Selección de Rol */}
            {!selectedRole ? (
              <div className="role-selection">
                <p className="role-title">¿Cuál es tu rol?</p>
                <div className="role-cards">
                  <button type="button" className="role-card" onClick={() => setSelectedRole('pasajero')}>
                    <div className="role-icon">👤</div>
                    <h3>Pasajero</h3>
                    <p>Reserva viajes compartidos</p>
                  </button>

                  <button type="button" className="role-card" onClick={() => setSelectedRole('conductor')}>
                    <div className="role-icon">🚗</div>
                    <h3>Conductor</h3>
                    <p>Publica tu ruta diaria</p>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="role-selected">
                  <span className="role-badge">
                    {selectedRole === 'pasajero' ? '👤 Pasajero' : '🚗 Conductor'}
                  </span>
                  <button className="change-role" onClick={() => setSelectedRole(null)}>
                    Cambiar rol
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                  
                  {/* Datos Personales */}
                  <div className="section-title">📋 Datos Personales</div>
                  
                  <div className="form-group">
                    <label>Nombres *</label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input 
                        type="text" 
                        name="nombres" 
                        placeholder="Juan" 
                        value={formData.nombres} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Apellidos *</label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input 
                        type="text" 
                        name="apellidos" 
                        placeholder="Pérez" 
                        value={formData.apellidos} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Nombre de Usuario *</label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input 
                        type="text" 
                        name="nombreUsuario" 
                        placeholder="juanperez" 
                        value={formData.nombreUsuario} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Correo Electrónico *</label>
                    <div className="input-wrapper">
                      <Mail size={20} className="input-icon" />
                      <input 
                        type="email" 
                        name="correo" 
                        placeholder="tu@email.com" 
                        value={formData.correo} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Teléfono *</label>
                    <div className="input-wrapper">
                      <Phone size={20} className="input-icon" />
                      <input 
                        type="tel" 
                        name="telefono" 
                        placeholder="+57 300 000 0000" 
                        value={formData.telefono} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Contraseña *</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="contrasenaHash"
                        placeholder="Mínimo 8 caracteres"
                        value={formData.contrasenaHash}
                        onChange={handleChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="toggle-password" 
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirmar Contraseña *</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Repite tu contraseña"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="toggle-password" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Datos del Vehículo - Solo para Conductores */}
                  {selectedRole === 'conductor' && (
                    <>
                      <div className="section-title">🚗 Datos del Vehículo</div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Marca *</label>
                          <div className="input-wrapper">
                            <Car size={20} className="input-icon" />
                            <input 
                              type="text" 
                              name="marca" 
                              placeholder="Ej: Toyota, Mazda" 
                              value={formData.marca} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Modelo *</label>
                          <div className="input-wrapper">
                            <input 
                              type="text" 
                              name="modelo" 
                              placeholder="Ej: Corolla, 3" 
                              value={formData.modelo} 
                              onChange={handleChange} 
                              className="no-icon-input"
                              required 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Año *</label>
                          <div className="input-wrapper">
                            <Calendar size={20} className="input-icon" />
                            <input 
                              type="number" 
                              name="anio" 
                              placeholder="2020" 
                              min="1990"
                              max="2025"
                              value={formData.anio} 
                              onChange={handleChange} 
                              required 
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Placa *</label>
                          <div className="input-wrapper">
                            <Hash size={20} className="input-icon" />
                            <input 
                              type="text" 
                              name="placa" 
                              placeholder="ABC123" 
                              value={formData.placa} 
                              onChange={handleChange} 
                              className="uppercase-input"
                              required 
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Aceptar Términos */}
                  <div className="terms-section">
                    <label className="terms-checkbox">
                      <input 
                        type="checkbox" 
                        name="acceptTerms" 
                        checked={formData.acceptTerms} 
                        onChange={handleChange} 
                      />
                      <span>
                        Acepto los{' '}
                        <button 
                          type="button" 
                          className="terms-link" 
                          onClick={() => setShowTerms(true)}
                        >
                          términos y condiciones
                        </button>
                      </span>
                    </label>
                  </div>

                  {/* Botón */}
                  <button 
                    type="submit" 
                    className={`submit-btn ${loading ? 'loading' : ''}`} 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Creando cuenta...
                      </>
                    ) : (
                      <>
                        Crear Cuenta
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>

                <p className="login-link">
                  ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Términos */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Términos y Condiciones</h2>
            <p>Contenido de los términos y condiciones de MoviFlexx...</p>
            <button className="close-modal" onClick={() => setShowTerms(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
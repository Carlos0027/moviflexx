import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Manejador de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validación del formulario
  const validateForm = () => {
    if (!selectedRole) {
      setError('Por favor selecciona un rol');
      return false;
    }
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
     
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, 
        role: selectedRole,
        createdAt: new Date().toISOString(),
        token: "fake-token-" + Math.random().toString(36).substr(2, 10)
      };

      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Usuario guardado en LocalStorage:", userData);

      setSuccess(true);
      setLoading(false);

      // Redirigir al Login después de 2s
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    }, 1500);
  };

  if (success) {
    return (
      <div className="register-container">
        <div className="success-message">
          <CheckCircle size={80} className="success-icon" />
          <h2>¡Registro Exitoso!</h2>
          <p>Tu cuenta ha sido creada correctamente</p>
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
                  <button className="change-role" onClick={() => setSelectedRole(null)}>Cambiar rol</button>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                  
                  {/* Nombre */}
                  <div className="form-group">
                    <label>Nombre Completo</label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input type="text" name="fullName" placeholder="Juan Pérez" value={formData.fullName} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <div className="input-wrapper">
                      <Mail size={20} className="input-icon" />
                      <input type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="form-group">
                    <label>Teléfono</label>
                    <div className="input-wrapper">
                      <Phone size={20} className="input-icon" />
                      <input type="tel" name="phone" placeholder="+57 300 000 0000" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div className="form-group">
                    <label>Contraseña</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmar contraseña */}
                  <div className="form-group">
                    <label>Confirmar Contraseña</label>
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
                      <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Aceptar Términos */}
                  <div className="terms-section">
                    <label className="terms-checkbox">
                      <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} />
                      <span>Acepto los <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>términos y condiciones</button></span>
                    </label>
                  </div>

                  {/* Botón */}
                  <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
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
            <p>Contenido de los términos...</p>
            <button className="close-modal" onClick={() => setShowTerms(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

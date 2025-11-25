import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

    // Simulación de registro
    setTimeout(() => {
      console.log('Registro exitoso:', { ...formData, role: selectedRole });
      setSuccess(true);
      setLoading(false);
      
      // Redirigir después de 2 segundos según el rol
      setTimeout(() => {
        if (selectedRole === 'conductor') {
          navigate('/bienvenido-conductor');
        } else {
          navigate('/bienvenido-pasajero');
        }
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
          <p className="redirect-text">Preparando tu bienvenida...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Left Side - Info */}
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

        {/* Right Side - Form */}
        <div className="register-form-container">
          <div className="form-content">
            <h2>Crear Cuenta</h2>
            <p className="subtitle">Completa el formulario para comenzar</p>

            {error && <div className="error-message">{error}</div>}

            {/* Role Selection */}
            {!selectedRole ? (
              <div className="role-selection">
                <p className="role-title">¿Cuál es tu rol?</p>
                <div className="role-cards">
                  <button
                    type="button"
                    className="role-card"
                    onClick={() => setSelectedRole('pasajero')}
                  >
                    <div className="role-icon">👤</div>
                    <h3>Pasajero</h3>
                    <p>Busca y reserva viajes compartidos</p>
                  </button>

                  <button
                    type="button"
                    className="role-card"
                    onClick={() => setSelectedRole('conductor')}
                  >
                    <div className="role-icon">🚗</div>
                    <h3>Conductor</h3>
                    <p>Comparte tu ruta fija con pasajeros</p>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="role-selected">
                  <span className="role-badge">
                    {selectedRole === 'pasajero' ? '👤 Pasajero' : '🚗 Conductor'}
                  </span>
                  <button
                    type="button"
                    className="change-role"
                    onClick={() => setSelectedRole(null)}
                  >
                    Cambiar rol
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName">Nombre Completo</label>
                    <div className="input-wrapper">
                      <User size={20} className="input-icon" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Juan Pérez"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <div className="input-wrapper">
                      <Mail size={20} className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <div className="input-wrapper">
                      <Phone size={20} className="input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+34 123 456 789"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        value={formData.password}
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

                  {/* Confirm Password */}
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <div className="input-wrapper">
                      <Lock size={20} className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
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

                  {/* Terms & Conditions */}
                  <div className="terms-section">
                    <label className="terms-checkbox">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                      />
                      <span>Acepto los <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>términos y condiciones</button></span>
                    </label>
                  </div>

                  {/* Submit Button */}
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

                {/* Login Link */}
                <p className="login-link">
                  ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Términos y Condiciones</h2>
            <div className="terms-text">
              <h3>1. Aceptación de Términos</h3>
              <p>Al usar MoviFlexx, aceptas estos términos y condiciones completamente. Si no estás de acuerdo, no debes usar nuestros servicios.</p>

              <h3>2. Descripción del Servicio</h3>
              <p>MoviFlexx es una plataforma que conecta conductores con pasajeros para compartir viajes. Los conductores publican rutas fijas y los pasajeros pueden reservar asientos.</p>

              <h3>3. Responsabilidades del Usuario</h3>
              <p>Eres responsable de mantener la confidencialidad de tu cuenta. No permitimos comportamiento discriminatorio, acoso o violencia. Todos los viajeros deben ser respetuosos.</p>

              <h3>4. Cancelaciones</h3>
              <p>Los pasajeros pueden cancelar hasta 2 horas antes del viaje. Los conductores tienen derecho a cancelar con motivo válido. Se aplicarán penalizaciones por cancelaciones frecuentes.</p>

              <h3>5. Pagos y Reembolsos</h3>
              <p>Los pagos se procesan a través de métodos seguros. Los reembolsos se realizan según la política de cancelación. No hay devoluciones de dinero después de completar el viaje.</p>

              <h3>6. Seguro y Responsabilidad</h3>
              <p>MoviFlexx incluye seguro básico en todos los viajes. La plataforma no es responsable de accidentes, robos o lesiones más allá del seguro incluido.</p>

              <h3>7. Datos Personales</h3>
              <p>Tu privacidad es importante. Protegemos tus datos según nuestras políticas de privacidad. No compartimos información personal sin consentimiento.</p>

              <h3>8. Modificación de Términos</h3>
              <p>MoviFlexx se reserva el derecho de modificar estos términos. Los cambios serán notificados con anticipación.</p>
            </div>
            <button className="close-modal" onClick={() => setShowTerms(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
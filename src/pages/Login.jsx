import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"; 
import "../pages/Bienvenido"

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    setTimeout(() => {
      if (!storedUser) {
        setError("No hay usuarios registrados.");
        setLoading(false);
        return;
      }

      if (email !== storedUser.email) {
        setError("El correo no coincide con ningún usuario registrado.");
        setLoading(false);
        return;
      }

      if (password !== storedUser.password) {
        setError("La contraseña es incorrecta.");
        setLoading(false);
        return;
      }

      console.log("Login exitoso:", storedUser);
      setLoading(false);

      // Redirigir a la página de bienvenida
      navigate('/bienvenido-admin');
    }, 1200);
  };

  
  return (
    <div className="login-container">
      <div className="login-wrapper">
        
        {/* Left Side - Branding */}
        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-logo">
              <span>MF</span>
            </div>
            <h1>MoviFlexx</h1>
            <p>Tu plataforma de streaming favorita</p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Acceso ilimitado a contenido</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Múltiples perfiles de usuario</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Descargas sin conexión</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-container">
          <div className="form-content">
            <h2>Bienvenido de Vuelta</h2>
            <p className="subtitle">Inicia sesión en tu cuenta para continuar</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Options */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Recuérdame</span>
                </label>
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className={`submit-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    Iniciar Sesión
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>O continúa con</span>
            </div>

            {/* Social */}
            <div className="social-login">
              <button className="social-btn google">Google</button>
              <button className="social-btn github">GitHub</button>
            </div>

            {/* Link */}
            <p className="signup-link">
              ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
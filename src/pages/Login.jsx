import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

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

    setTimeout(() => {
      // Obtener usuario registrado
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("No hay usuarios registrados. Por favor regístrate primero.");
        setLoading(false);
        return;
      }

      if (!email || !password) {
        setError('Por favor completa todos los campos');
        setLoading(false);
        return;
      }

      try {
        const userData = JSON.parse(storedUser);

        // CAMBIO AQUÍ: usar 'correo' en lugar de 'email'
        if (email !== userData.correo) {
          setError("El correo no coincide con ningún usuario registrado.");
          setLoading(false);
          return;
        }

        // CAMBIO AQUÍ: usar 'contrasenaHash' en lugar de 'password'
        if (password !== userData.contrasenaHash) {
          setError("La contraseña es incorrecta.");
          setLoading(false);
          return;
        }

        // Login exitoso
        console.log("Login exitoso:", userData);
        
        setLoading(false);

        // Redirigir a la página de bienvenida
        navigate('/bienvenido');

      } catch (error) {
        console.error("Error al procesar el login:", error);
        setError("Error al iniciar sesión. Intenta de nuevo.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-logo">
              <span>MF</span>
            </div>
            <h1>MoviFlexx</h1>
            <p>Tu plataforma de viajes compartidos favorita</p>
            <div className="brand-features">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Viajes seguros y verificados</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Ahorra dinero compartiendo</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Comunidad de confianza</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <div className="form-content">
            <h2>Bienvenido de Vuelta</h2>
            <p className="subtitle">Inicia sesión en tu cuenta para continuar</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">

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

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Recuérdame</span>
                </label>
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
              </div>

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

            <div className="divider">
              <span>O continúa con</span>
            </div>

            <div className="social-login">
              <button className="social-btn google">Google</button>
              <button className="social-btn github">GitHub</button>
            </div>

            <p className="signup-link">
              ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
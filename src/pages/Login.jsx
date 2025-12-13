import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import "./Login.css"; 
import "../pages/Bienvenido"
=======
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
>>>>>>> origin/dev

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

<<<<<<< HEAD
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    setTimeout(() => {
      if (!storedUser) {
        setError("No hay usuarios registrados.");
=======
    try {
      const respuesta = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setError(data.message || 'Error al iniciar sesión');
>>>>>>> origin/dev
        setLoading(false);
        return;
      }

<<<<<<< HEAD
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
=======
      // Login exitoso
      console.log("Login exitoso:", data);

      // Aquí puedes guardar el token en AuthContext si lo tienes
      // guardarToken(data.token);
      // guardarnombre(data.usuario.nombre);

      setLoading(false);

      // Redirigir a la página de bienvenida
      navigate('/bienvenido');

    } catch (error) {
      console.error("Error al procesar el login:", error);
      setError("Error de conexión. Verifica que el servidor esté activo.");
      setLoading(false);
    }
>>>>>>> origin/dev
  };

  
  return (
    <div className="login-container">
      <div className="container-fluid h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-xl-10">
            <div className="card login-card border-0 shadow-lg">
              <div className="row g-0">
                {/* BRAND SIDE */}
                <div className="col-lg-5 d-none d-lg-block">
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
                </div>

                {/* FORM SIDE */}
                <div className="col-lg-7">
                  <div className="login-form-container">
                    <div className="form-content">
                      <h2>Bienvenido de Vuelta</h2>
                      <p className="subtitle">Inicia sesión en tu cuenta para continuar</p>

                      {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          {error}
                          <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setError('')}
                            aria-label="Close"
                          ></button>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">Correo Electrónico</label>
                          <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="tu@email.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="password" className="form-label">Contraseña</label>
                          <div className="input-wrapper">
                            <Lock size={20} className="input-icon" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="form-control"
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
                          <div className="form-check">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="remember"
                            />
                            <label className="form-check-label" htmlFor="remember">
                              Recuérdame
                            </label>
                          </div>
                          <Link to="/forgot-password" className="forgot-password">
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </div>

                        <button
                          type="submit"
                          className={`submit-btn btn btn-primary w-100 ${loading ? 'loading' : ''}`}
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Iniciando sesión...
                            </>
                          ) : (
                            <>
                              Iniciar Sesión
                              <ArrowRight size={20} className="ms-2" />
                            </>
                          )}
                        </button>
                      </form>

                      <div className="divider">
                        <span>O continúa con</span>
                      </div>

                      <div className="social-login row g-2">
                        <div className="col-6">
                          <button className="btn btn-outline-secondary social-btn w-100">
                            <svg className="me-2" width="18" height="18" viewBox="0 0 20 20">
                              <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
                              <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
                              <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
                              <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
                            </svg>
                            Google
                          </button>
                        </div>
                        <div className="col-6">
                          <button className="btn btn-outline-secondary social-btn w-100">
                            <svg className="me-2" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            GitHub
                          </button>
                        </div>
                      </div>

                      <p className="signup-link text-center mt-4">
                        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
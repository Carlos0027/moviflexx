import React, { useState } from 'react';
import { ChevronRight, MapPin, Users, Zap, Shield, Car, ArrowRight, Check, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeBase() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: Car,
      title: "Rutas Compartidas",
      desc: "Conductores con rutas fijas de inicio a fin",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      icon: Shield,
      title: "100% Seguro",
      desc: "Verificación de identidad y reseñas de usuarios",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      icon: Users,
      title: "Comunidad",
      desc: "Conecta con viajeros de tu zona",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      icon: Zap,
      title: "Economía",
      desc: "Reduce costos compartiendo gastos",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  const stats = [
    { number: "50K+", label: "Viajeros Activos" },
    { number: "100K+", label: "Viajes Completados" },
    { number: "95%", label: "Satisfacción" },
    { number: "24/7", label: "Soporte" }
  ];

  const plans = [
    {
      name: "Pasajero",
      price: "Gratis",
      period: "siempre",
      features: ["Buscar rutas", "Reservar asiento", "Calificar conductores", "Historial de viajes"],
      popular: false
    },
    {
      name: "Conductor Premium",
      price: "$4.99",
      period: "/mes",
      features: ["Crear rutas", "Acepto pasajeros", "Estadísticas de viajes", "Prioridad en soporte", "Sin comisión extra"],
      popular: true
    },
    {
      name: "Empresa",
      price: "Personalizado",
      period: "/mes",
      features: ["Múltiples vehículos", "Panel administrativo", "Reportes detallados", "Soporte dedicado", "API integration"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Juan Martínez",
      role: "Pasajero verificado",
      avatar: "JM",
      text: "Excelente app, conductor amable y viaje seguro. ¡La recomiendo!",
      rating: 5
    },
    {
      name: "María Sánchez",
      role: "Conductora verificada",
      avatar: "MS",
      text: "He recuperado dinero en mis viajes diarios. Muy buena experiencia.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      role: "Pasajero verificado",
      avatar: "CR",
      text: "Seguridad, confiabilidad y precios justos. Perfecto para viajar.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "¿Es seguro viajar en MoviFlexx?",
      answer: "Sí, todos los usuarios son verificados, incluimos seguros en los viajes y tenemos calificaciones públicas."
    },
    {
      question: "¿Cómo se fija el precio?",
      answer: "Los conductores fijan el precio por asiento según la distancia y gastos. Es totalmente transparente."
    },
    {
      question: "¿Puedo cancelar mi reserva?",
      answer: "Sí, puedes cancelar hasta 2 horas antes del viaje con reembolso completo."
    },
    {
      question: "¿Qué necesito para ser conductor?",
      answer: "Licencia válida, documento de identidad, vehículo registrado y verificación de antecedentes."
    },
    {
      question: "¿Hay comisión al conductor?",
      answer: "Solo 10% de comisión en planes gratuitos. Sin comisión en planes Premium."
    },
    {
      question: "¿Cómo reporto un problema?",
      answer: "Contacta a nuestro equipo 24/7 desde la app o web. Resolvemos en menos de 24 horas."
    }
  ];

  return (

    
    <div className="home-wrapper">
      {/* ==================== HERO SECTION ==================== */}
      <section id="inicio" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="display-3 fw-bold mb-4">
            <span className="text-dark">Viaja</span>{' '}
            <span className="azul-rey">Compartido</span>{' '}
            <span className="text-dark">Con</span>{' '}
            <span className="morado-solido">Confianza</span>
          </h1>
            <p className="hero-subtitle">
              La plataforma comunitaria donde conductores comparten rutas fijas 
              y pasajeros encuentran viajes seguros y económicos.
            </p>
            
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">
                Comenzar Ahora
                <ChevronRight size={20} />
              </Link>
              <button className="btn-secondary">
                Ver Cómo Funciona
              </button>
            </div>

                <div className="d-flex align-items-center gap-3 text-muted">
                  <div className="d-flex align-items-center gap-2">
                    <Check size={18} className="text-success" />
                    <small>Verificación de identidad</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Check size={18} className="text-success" />
                    <small>Seguros incluidos</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Check size={18} className="text-success" />
                    <small>24/7 Soporte</small>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card border-0 shadow-purple" style={{ minHeight: '450px', borderRadius: '30px', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)' }}>
                  <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-5">
                    <div className="bg-gradient-purple rounded-4 p-4 mb-4" style={{ width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={60} className="text-white" />
                    </div>
                    <h3 className="fw-bold mb-2">Conectando Viajeros</h3>
                    <p className="text-muted">De forma segura y económica</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="features-section">
        <div className="container-xxl">
          <div className="section-header">
            <h2 className="section-title">¿Por Qué Elegir MoviFlexx?</h2>
            <p className="section-subtitle">
              La forma más segura y económica de viajar
            </p>
          </div>

            <div className="row g-4">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.id} className="col-md-6 col-lg-3">
                    <div 
                      className="card h-100 card-hover"
                      onMouseEnter={() => setHoveredFeature(feature.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                      style={{ borderRadius: '20px' }}
                    >
                      <div className="card-body text-center p-4">
                        <div 
                          className="feature-icon-wrapper"
                          style={{ background: feature.gradient }}
                        >
                          <IconComponent size={36} className="text-white" />
                        </div>
                        <h5 className="card-title fw-bold mb-2">{feature.title}</h5>
                        <p className="card-text text-muted">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="stats-section">
        <div className="container-xxl">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="how-works-section">
        <div className="container-xxl">
          <div className="section-header">
            <h2 className="section-title">¿Cómo Funciona?</h2>
            <p className="section-subtitle">Tres pasos simples para comenzar</p>
          </div>

          <div className="how-works-grid">
            <div className="work-card">
              <div className="work-number">1</div>
              <h3>Registrate</h3>
              <p>Crea tu cuenta como pasajero o conductor en segundos</p>
              <div className="work-icon">📝</div>
            </div>

            <div className="row g-4 align-items-stretch">
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm text-center h-100" style={{ borderRadius: '20px' }}>
                  <div className="card-body p-4">
                    <div className="bg-gradient-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '70px', height: '70px', fontSize: '1.8rem', fontWeight: 'bold' }}>
                      1
                    </div>
                    <h4 className="fw-bold mb-3">Regístrate</h4>
                    <p className="text-muted mb-3">Crea tu cuenta como pasajero o conductor en segundos</p>
                    <div style={{ fontSize: '3rem' }}>📝</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-3 border-purple shadow-purple text-center h-100" style={{ borderRadius: '20px' }}>
                  <div className="card-body p-4">
                    <div className="bg-gradient-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '70px', height: '70px', fontSize: '1.8rem', fontWeight: 'bold' }}>
                      2
                    </div>
                    <h4 className="fw-bold mb-3">Busca o Crea</h4>
                    <p className="text-muted mb-3">Busca rutas disponibles o crea tu propia ruta fija</p>
                    <div style={{ fontSize: '3rem' }}>🗺️</div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card border-0 shadow-sm text-center h-100" style={{ borderRadius: '20px' }}>
                  <div className="card-body p-4">
                    <div className="bg-gradient-purple text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{ width: '70px', height: '70px', fontSize: '1.8rem', fontWeight: 'bold' }}>
                      3
                    </div>
                    <h4 className="fw-bold mb-3">Viaja Seguro</h4>
                    <p className="text-muted mb-3">Disfruta de viajes compartidos seguros y económicos</p>
                    <div style={{ fontSize: '3rem' }}>🚗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ==================== PRICING SECTION ==================== */}
      <section id="pricing" className="pricing-section">
        <div className="container-xxl">
          <div className="section-header">
            <h2 className="section-title">Planes para Todos</h2>
            <p className="section-subtitle">
              Elige el plan que mejor se adapte a ti
            </p>
          </div>

            <div className="row g-4 justify-content-center">
              {plans.map((plan, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className={`card h-100 ${plan.popular ? 'border-3 border-purple shadow-purple' : 'border-2 shadow-sm'}`} style={{ borderRadius: '20px', position: 'relative' }}>
                    {plan.popular && (
                      <div className="position-absolute top-0 start-50 translate-middle">
                        <span className="badge text-white px-4 py-2" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px' }}>Más Popular</span>
                      </div>
                    )}
                    <div className="card-body p-4 pt-5">
                      <h3 className="card-title fw-bold mb-3 text-center">{plan.name}</h3>
                      <div className="text-center mb-4">
                        <span className="display-4 fw-bold">{plan.price}</span>
                        <span className="text-muted fs-5">{plan.period}</span>
                      </div>

                      <button 
                        className={`btn ${plan.popular ? 'btn-purple' : 'btn-outline-purple'} w-100 mb-4 py-3 d-flex align-items-center justify-content-center gap-2`}
                        onClick={() => navigate('/register')}
                      >
                        Elegir Plan
                        <ArrowRight size={18} />
                      </button>

                      <ul className="list-unstyled">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="mb-3 d-flex align-items-start gap-2">
                            <Check size={20} className="text-success flex-shrink-0 mt-1" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section className="testimonials-section">
        <div className="container-xxl">
          <div className="section-header">
            <h2 className="section-title">Testimonios</h2>
            <p className="section-subtitle">Lo que dicen nuestros usuarios</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Excelente app, conductor amable y viaje seguro. ¡La recomiendo!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">JM</div>
                <div>
                  <strong>Juan Martínez</strong>
                  <p>Pasajero verificado</p>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="col-lg-4">
                  <div className="card border-0 shadow-sm h-100 card-hover" style={{ borderRadius: '20px' }}>
                    <div className="card-body p-4">
                      <div className="mb-3" style={{ fontSize: '1.3rem', color: '#ffc107' }}>
                        {'★'.repeat(testimonial.rating)}
                      </div>
                      <p className="card-text fst-italic mb-4">"{testimonial.text}"</p>
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-gradient-purple text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                             style={{ width: '55px', height: '55px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                          <small className="text-muted">{testimonial.role}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* ==================== CTA SECTION ==================== */}
      <section id="contact" className="cta-section">
        <div className="container-xxl">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para Ahorrar en Tus Viajes?</h2>
            <p className="cta-subtitle">
              Únete a miles de viajeros que ya confían en MoviFlexx
            </p>
            
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/register" className="btn btn-light btn-lg px-5 py-3 d-flex align-items-center gap-2 fw-bold text-decoration-none" style={{ borderRadius: '12px' }}>
                Registrarse Ahora
                <ChevronRight size={20} />
              </Link>
              <button className="btn btn-outline-light btn-lg px-5 py-3 fw-bold" style={{ borderRadius: '12px' }} onClick={() => {
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Contactar Soporte
              </button>
            </div>
          </div>
        </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="faq-section">
        <div className="container-xxl">
          <div className="section-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Es seguro viajar en MoviFlexx?</h4>
              <p>Sí, todos los usuarios son verificados, incluimos seguros en los viajes y tenemos calificaciones públicas.</p>
            </div>

            <div className="row g-4">
              {faqs.map((faq, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="card border-0 shadow-sm h-100 card-hover" style={{ borderRadius: '20px' }}>
                    <div className="card-body p-4">
                      <h5 className="card-title fw-bold mb-3">{faq.question}</h5>
                      <p className="card-text text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="container-xxl">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <span className="logo-icon">MF</span>
                <span>MoviFlexx</span>
              </div>
              <p className="footer-desc">Conectando viajeros de forma segura y económica.</p>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>

              <div className="col-lg-2 col-md-4">
                <h6 className="fw-bold mb-3">Producto</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-link text-white text-decoration-none opacity-75 p-0">
                      Inicio
                    </button>
                  </li>
                  <li className="mb-2">
                    <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-link text-white text-decoration-none opacity-75 p-0">
                      Features
                    </button>
                  </li>
                  <li className="mb-2">
                    <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-link text-white text-decoration-none opacity-75 p-0">
                      Precios
                    </button>
                  </li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-4">
                <h6 className="fw-bold mb-3">Empresa</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/blog" className="text-white text-decoration-none opacity-75">Blog</Link></li>
                  <li className="mb-2"><Link to="/about" className="text-white text-decoration-none opacity-75">Sobre Nosotros</Link></li>
                  <li className="mb-2"><Link to="/careers" className="text-white text-decoration-none opacity-75">Carreras</Link></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-4">
                <h6 className="fw-bold mb-3">Legal</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><Link to="/terms" className="text-white text-decoration-none opacity-75">Términos</Link></li>
                  <li className="mb-2"><Link to="/privacy" className="text-white text-decoration-none opacity-75">Privacidad</Link></li>
                  <li className="mb-2"><Link to="/support" className="text-white text-decoration-none opacity-75">Soporte</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-top border-white border-opacity-25 pt-4 text-center">
              <p className="mb-0 opacity-75">&copy; 2025 MoviFlexx. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>

      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
        crossOrigin="anonymous"
      />
    </>
  );
}
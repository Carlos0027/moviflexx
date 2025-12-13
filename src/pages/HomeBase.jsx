import React, { useState } from 'react';
import { ChevronRight, MapPin, Users, Zap, Shield, Car, ArrowRight, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import "./HomeBase.css";

export default function HomeBase() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 1,
      icon: Car,
      title: "Rutas Compartidas",
      desc: "Conductores con rutas fijas de inicio a fin",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: Shield,
      title: "100% Seguro",
      desc: "Verificación de identidad y reseñas de usuarios",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      icon: Users,
      title: "Comunidad",
      desc: "Conecta con viajeros de tu zona",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 4,
      icon: Zap,
      title: "Economía",
      desc: "Reduce costos compartiendo gastos",
      color: "from-orange-500 to-orange-600"
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

            <div className="hero-trust">
              <p>✓ Verificación de identidad • ✓ Seguros incluidos • ✓ 24/7 Soporte</p>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image">
              <div className="image-placeholder">
                <MapPin size={80} />
                <p>Conectando viajeros de forma segura</p>
              </div>
            </div>
            <div className="image-glow"></div>
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

          <div className="features-grid">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="feature-card"
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`feature-icon bg-gradient-to-br ${feature.color}`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                  <div className={`feature-underline ${hoveredFeature === feature.id ? 'active' : ''}`}></div>
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
            <div className="work-arrow">→</div>
            <div className="work-card">
              <div className="work-number">2</div>
              <h3>Busca o Crea</h3>
              <p>Busca rutas disponibles o crea tu propia ruta fija</p>
              <div className="work-icon">🗺️</div>
            </div>
            <div className="work-arrow">→</div>
            <div className="work-card">
              <div className="work-number">3</div>
              <h3>Viaja Seguro</h3>
              <p>Disfruta de viajes compartidos seguros y económicos</p>
              <div className="work-icon">🚗</div>
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

          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && <div className="popular-badge">Más Popular</div>}
                
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>

                <button className={`plan-button ${plan.popular ? 'primary' : 'secondary'}`}>
                  Elegir Plan
                  <ArrowRight size={18} />
                </button>

                <div className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <Check size={20} className="check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
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

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"He recuperado dinero en mis viajes diarios. Muy buena experiencia."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MS</div>
                <div>
                  <strong>María Sánchez</strong>
                  <p>Conductora verificada</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Seguridad, confiabilidad y precios justos. Perfecto para viajar."</p>
              <div className="testimonial-author">
                <div className="author-avatar">CR</div>
                <div>
                  <strong>Carlos Rodríguez</strong>
                  <p>Pasajero verificado</p>
                </div>
              </div>
            </div>
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
            
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary lg">
                Registrarse Ahora
                <ChevronRight size={20} />
              </Link>
              <button className="btn-secondary lg">
                Contactar Soporte
              </button>
            </div>
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

            <div className="faq-item">
              <h4>¿Cómo se fija el precio?</h4>
              <p>Los conductores fijan el precio por asiento según la distancia y gastos. Es totalmente transparente.</p>
            </div>

            <div className="faq-item">
              <h4>¿Puedo cancelar mi reserva?</h4>
              <p>Sí, puedes cancelar hasta 2 horas antes del viaje con reembolso completo.</p>
            </div>

            <div className="faq-item">
              <h4>¿Qué necesito para ser conductor?</h4>
              <p>Licencia válida, documento de identidad, vehículo registrado y verificación de antecedentes.</p>
            </div>

            <div className="faq-item">
              <h4>¿Hay comisión al conductor?</h4>
              <p>Solo 10% de comisión en planes gratuitos. Sin comisión en planes Premium.</p>
            </div>

            <div className="faq-item">
              <h4>¿Cómo reporto un problema?</h4>
              <p>Contacta a nuestro equipo 24/7 desde la app o web. Resolvemos en menos de 24 horas.</p>
            </div>
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

            <div className="footer-column">
              <h4>Producto</h4>
              <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Precios</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Carreras</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Términos de Servicio</a></li>
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Soporte</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 MoviFlexx. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import { Container, Navbar, Nav, Button, Card, Row, Col, Form, Modal, Badge } from 'react-bootstrap';

// Componente principal App
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'driver' o 'passenger'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' o 'register'

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentPage('home');
  };

  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    setShowAuthModal(false);
    setCurrentPage(type === 'driver' ? 'driver-dashboard' : 'passenger-dashboard');
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <NavigationBar 
        isLoggedIn={isLoggedIn} 
        userType={userType}
        onLogout={handleLogout}
        onNavigate={setCurrentPage}
        onOpenAuth={openAuth}
      />
      
      {currentPage === 'home' && <HomePage onOpenAuth={openAuth} />}
      {currentPage === 'driver-dashboard' && <DriverDashboard />}
      {currentPage === 'passenger-dashboard' && <PassengerDashboard />}
      {currentPage === 'my-trips' && <MyTrips userType={userType} />}
      
      <AuthModal 
        show={showAuthModal}
        mode={authMode}
        onHide={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      />
      
      <Footer />
    </div>
  );
}

// Navbar Component
function NavigationBar({ isLoggedIn, userType, onLogout, onNavigate, onOpenAuth }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => onNavigate('home')} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.5rem' }}>
          🚗 Moviflex
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={() => onNavigate('home')}>Inicio</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link onClick={() => onNavigate(userType === 'driver' ? 'driver-dashboard' : 'passenger-dashboard')}>
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => onNavigate('my-trips')}>Mis Viajes</Nav.Link>
                <Button variant="outline-light" size="sm" onClick={onLogout} className="ms-2">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" size="sm" onClick={() => onOpenAuth('login')} className="ms-2">
                  Iniciar Sesión
                </Button>
                <Button variant="primary" size="sm" onClick={() => onOpenAuth('register')} className="ms-2">
                  Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Home Page
function HomePage({ onOpenAuth }) {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Viaja de forma inteligente y económica</h1>
              <p className="lead mb-4">
                Conecta con conductores que van en tu dirección. Comparte viajes, ahorra dinero y conoce gente nueva.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg" onClick={() => onOpenAuth('register')}>
                  Comenzar Ahora
                </Button>
                <Button variant="outline-light" size="lg">
                  Cómo Funciona
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center mt-4 mt-lg-0">
              <div className="bg-white rounded-3 p-5" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2 className="text-primary">🚗 🛣️ 👥</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5 fw-bold">¿Por qué elegir Moviflex?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="fs-1 mb-3">💰</div>
                <h4>Ahorra Dinero</h4>
                <p className="text-muted">
                  Comparte los gastos del viaje y ahorra hasta un 70% en transporte diario.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="fs-1 mb-3">🌍</div>
                <h4>Cuida el Planeta</h4>
                <p className="text-muted">
                  Reduce tu huella de carbono compartiendo vehículos con otros pasajeros.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="fs-1 mb-3">🤝</div>
                <h4>Conoce Gente</h4>
                <p className="text-muted">
                  Conecta con personas de tu comunidad y haz nuevos amigos en el camino.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How it Works */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">¿Cómo funciona?</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 border-primary">
                <Card.Body className="p-4">
                  <h3 className="text-primary mb-4">Para Conductores</h3>
                  <div className="d-flex mb-3">
                    <Badge bg="primary" className="me-3">1</Badge>
                    <p className="mb-0">Publica tu ruta con destino único</p>
                  </div>
                  <div className="d-flex mb-3">
                    <Badge bg="primary" className="me-3">2</Badge>
                    <p className="mb-0">Los pasajeros solicitan unirse</p>
                  </div>
                  <div className="d-flex">
                    <Badge bg="primary" className="me-3">3</Badge>
                    <p className="mb-0">Recibe contribución por los gastos</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-success">
                <Card.Body className="p-4">
                  <h3 className="text-success mb-4">Para Pasajeros</h3>
                  <div className="d-flex mb-3">
                    <Badge bg="success" className="me-3">1</Badge>
                    <p className="mb-0">Busca rutas hacia tu destino</p>
                  </div>
                  <div className="d-flex mb-3">
                    <Badge bg="success" className="me-3">2</Badge>
                    <p className="mb-0">Solicita unirte al viaje</p>
                  </div>
                  <div className="d-flex">
                    <Badge bg="success" className="me-3">3</Badge>
                    <p className="mb-0">Comparte el viaje y los gastos</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5 text-center">
        <h2 className="mb-4 fw-bold">¿Listo para comenzar?</h2>
        <p className="lead mb-4">Únete a miles de usuarios que ya están viajando de forma inteligente</p>
        <Button variant="primary" size="lg" onClick={() => onOpenAuth('register')}>
          Crear Cuenta Gratis
        </Button>
      </Container>
    </>
  );
}

// Driver Dashboard
function DriverDashboard() {
  const [showCreateRoute, setShowCreateRoute] = useState(false);
  const [routes, setRoutes] = useState([
    { id: 1, origin: 'Centro', destination: 'Universidad Nacional', time: '08:00 AM', seats: 3, price: '$5.000', status: 'Activa' },
    { id: 2, origin: 'Usaquén', destination: 'Salitre', time: '06:30 PM', seats: 2, price: '$4.000', status: 'Completa' }
  ]);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Panel de Conductor</h2>
        <Button variant="primary" onClick={() => setShowCreateRoute(true)}>
          + Crear Nueva Ruta
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Rutas Activas</h6>
              <h3 className="fw-bold">5</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Pasajeros Este Mes</h6>
              <h3 className="fw-bold">24</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Ganancias</h6>
              <h3 className="fw-bold">$120.000</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Calificación</h6>
              <h3 className="fw-bold">4.8 ⭐</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white">
          <h5 className="mb-0">Mis Rutas</h5>
        </Card.Header>
        <Card.Body className="p-0">
          {routes.map(route => (
            <div key={route.id} className="border-bottom p-3">
              <Row className="align-items-center">
                <Col md={4}>
                  <div className="fw-bold">{route.origin} → {route.destination}</div>
                  <small className="text-muted">{route.time}</small>
                </Col>
                <Col md={2}>
                  <Badge bg="info">{route.seats} asientos</Badge>
                </Col>
                <Col md={2}>
                  <span className="fw-bold text-success">{route.price}</span>
                </Col>
                <Col md={2}>
                  <Badge bg={route.status === 'Activa' ? 'success' : 'secondary'}>
                    {route.status}
                  </Badge>
                </Col>
                <Col md={2}>
                  <Button variant="outline-primary" size="sm">Ver Detalles</Button>
                </Col>
              </Row>
            </div>
          ))}
        </Card.Body>
      </Card>

      <Modal show={showCreateRoute} onHide={() => setShowCreateRoute(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Ruta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Origen</Form.Label>
                  <Form.Control type="text" placeholder="Punto de partida" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Destino</Form.Label>
                  <Form.Control type="text" placeholder="Destino final" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha y Hora</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Asientos Disponibles</Form.Label>
                  <Form.Select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Precio por Pasajero</Form.Label>
              <Form.Control type="number" placeholder="5000" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción (opcional)</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Información adicional sobre el viaje..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateRoute(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setShowCreateRoute(false)}>
            Publicar Ruta
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// Passenger Dashboard
function PassengerDashboard() {
  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchDestination, setSearchDestination] = useState('');
  
  const availableRoutes = [
    { id: 1, driver: 'Carlos M.', rating: 4.9, origin: 'Chapinero', destination: 'Universidad Nacional', time: 'Hoy, 08:00 AM', seats: 2, price: '$5.000' },
    { id: 2, driver: 'María L.', rating: 5.0, origin: 'Suba', destination: 'Centro', time: 'Hoy, 07:30 AM', seats: 3, price: '$4.500' },
    { id: 3, driver: 'Juan P.', rating: 4.7, origin: 'Kennedy', destination: 'Aeropuerto', time: 'Hoy, 10:00 AM', seats: 1, price: '$8.000' }
  ];

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Buscar Viaje</h2>
      
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <Form>
            <Row className="g-3">
              <Col md={5}>
                <Form.Group>
                  <Form.Label>¿Desde dónde viajas?</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Origen" 
                    value={searchOrigin}
                    onChange={(e) => setSearchOrigin(e.target.value)}
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>¿A dónde vas?</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Destino" 
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="primary" size="lg" className="w-100">
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Viajes Disponibles</h4>
      <Row className="g-3">
        {availableRoutes.map(route => (
          <Col key={route.id} md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
                      👤
                    </div>
                  </Col>
                  <Col md={3}>
                    <h6 className="mb-1">{route.driver}</h6>
                    <div className="text-warning">{'⭐'.repeat(Math.floor(route.rating))} {route.rating}</div>
                  </Col>
                  <Col md={4}>
                    <div className="fw-bold">{route.origin} → {route.destination}</div>
                    <small className="text-muted">{route.time}</small>
                  </Col>
                  <Col md={2}>
                    <div className="text-center">
                      <div className="fw-bold text-success fs-5">{route.price}</div>
                      <small className="text-muted">{route.seats} asientos</small>
                    </div>
                  </Col>
                  <Col md={1}>
                    <Button variant="primary" size="sm">
                      Solicitar
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// My Trips Component
function MyTrips({ userType }) {
  const trips = [
    { id: 1, route: 'Centro → Universidad', date: '25 Nov, 08:00 AM', status: 'Confirmado', passengers: 2 },
    { id: 2, route: 'Usaquén → Salitre', date: '24 Nov, 06:30 PM', status: 'Completado', passengers: 3 }
  ];

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Mis Viajes</h2>
      <Row className="g-3">
        {trips.map(trip => (
          <Col key={trip.id} md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={4}>
                    <h5 className="mb-1">{trip.route}</h5>
                    <small className="text-muted">{trip.date}</small>
                  </Col>
                  <Col md={3}>
                    <Badge bg={trip.status === 'Confirmado' ? 'success' : 'secondary'}>
                      {trip.status}
                    </Badge>
                  </Col>
                  <Col md={3}>
                    {userType === 'driver' && (
                      <span className="text-muted">{trip.passengers} pasajeros</span>
                    )}
                  </Col>
                  <Col md={2}>
                    <Button variant="outline-primary" size="sm">Ver Detalles</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// Auth Modal
function AuthModal({ show, mode, onHide, onLogin, onSwitchMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('passenger');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(userType);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Tu nombre" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {mode === 'register' && (
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Usuario</Form.Label>
              <div>
                <Form.Check 
                  type="radio"
                  label="Pasajero - Busco viajes"
                  name="userType"
                  value="passenger"
                  checked={userType === 'passenger'}
                  onChange={(e) => setUserType(e.target.value)}
                  id="passenger-radio"
                />
                <Form.Check 
                  type="radio"
                  label="Conductor - Ofrezco viajes"
                  name="userType"
                  value="driver"
                  checked={userType === 'driver'}
                  onChange={(e) => setUserType(e.target.value)}
                  id="driver-radio"
                />
              </div>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" className="w-100 mb-3">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Button>

          <div className="text-center">
            <small>
              {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <a href="#" onClick={(e) => { e.preventDefault(); onSwitchMode(); }} className="text-primary">
                {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
              </a>
            </small>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>🚗 Moviflex</h5>
            <p className="text-muted">Viajes comunitarios inteligentes</p>
          </Col>
          <Col md={4}>
            <h6>Enlaces</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-muted text-decoration-none">Sobre Nosotros</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Cómo Funciona</a></li>
              <li><a href="#" className="text-muted text-decoration-none">Términos y Condiciones</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contacto</h6>
            <p className="text-muted mb-0">Email: info@moviflex.com</p>
            <p className="text-muted">Tel: +57 300 123 4567</p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <div className="text-center text-muted">
          <small>&copy; 2024 Moviflex. Todos los derechos reservados.</small>
        </div>
      </Container>
    </footer>
  );
}

export default App;
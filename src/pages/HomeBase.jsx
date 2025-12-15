import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Mapa from '../Map';

function HomeBase() {
  return (
    <div>
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold">
                <span className="text-dark">Viaja</span>{' '}
                <span className="text-primary">Compartido</span>{' '}
                <span className="text-dark">Con</span>{' '}
                <span className="text-primary">Confianza</span>
              </h1>
              <p className="my-4">
                La plataforma comunitaria donde conductores comparten rutas fijas 
                y pasajeros encuentran viajes seguros y económicos.
              </p>
              <div>
              </div>
            </Col>
              <Col lg={6}>
                <Card>
                  <Card.Body className="p-4 text-center">
                    <Mapa />
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="mb-3">¿Cómo Funciona?</h2>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center p-4">
                  <div className="display-4 fw-bold text-primary mb-3">1</div>
                  <Card.Title className="mb-3">Registrate</Card.Title>
                  <Card.Text>Crea tu cuenta como pasajero o conductor</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center p-4">
                  <div className="display-4 fw-bold text-primary mb-3">2</div>
                  <Card.Title className="mb-3">Busca o Crea</Card.Title>
                  <Card.Text>Busca rutas disponibles o crea tu propia ruta</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center p-4">
                  <div className="display-4 fw-bold text-primary mb-3">3</div>
                  <Card.Title className="mb-3">Viaja Seguro</Card.Title>
                  <Card.Text>Disfruta de viajes compartidos seguros</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="mb-3">Planes</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={5} className="mb-4">
              <Card className="h-100">
                <Card.Body className="text-center p-4">
                  <Card.Title className="mb-3">Pasajero</Card.Title>
                  <div className="display-4 fw-bold mb-4">Gratis</div>
                  <div className="text-start">
                    <div className="mb-2">
                      <span className="text-success me-2">✓</span>
                      Buscar rutas
                    </div>
                    <div className="mb-2">
                      <span className="text-success me-2">✓</span>
                      Reservar asiento
                    </div>
                    <div>
                      <span className="text-success me-2">✓</span>
                      Calificar conductores
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5} className="mb-4">
              <Card className="h-100 border-primary">
                <Card.Body className="text-center p-4">
                  <Card.Title className="mb-3">Conductor Premium</Card.Title>
                  <div className="display-4 fw-bold mb-4">$4.99/mes</div>
                  <Button variant="outline-primary" className="w-100 mb-4">
                    Elegir Plan
                  </Button>
                  <div className="text-start">
                    <div className="mb-2">
                      <span className="text-success me-2">✓</span>
                      Aceptar pasajeros
                    </div>
                    <div>
                      <span className="text-success me-2">✓</span>
                      Sin comisión extra
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-dark text-white">
        <Container className="text-center">
          <h2 className="mb-4">¿Listo para Ahorrar en Tus Viajes?</h2>
          <Button as={Link} to="/register" variant="light">
            Registrarse Ahora
          </Button>
        </Container>
      </section>

      <footer className="py-5 bg-dark text-white">
        <Container>
          <Row className="mb-4">
            <Col lg={3} className="mb-4">
              <h4 className="mb-3">MoviFlexx</h4>
              <p>Conectando viajeros de forma segura y económica.</p>
              <div>
                <a href="#" className="text-white me-3">Facebook</a>
                <a href="#" className="text-white me-3">Twitter</a>
                <a href="#" className="text-white">Instagram</a>
              </div>
            </Col>
            <Col lg={3} className="mb-4">
              <h5 className="mb-3">Enlaces</h5>
              <div>
                <a href="#" className="text-white d-block mb-2">Inicio</a>
                <a href="#" className="text-white d-block mb-2">Precios</a>
                <a href="#" className="text-white d-block">Sobre Nosotros</a>
              </div>
            </Col>
            <Col lg={3} className="mb-4">
              <h5 className="mb-3">Legal</h5>
              <div>
                <a href="#" className="text-white d-block mb-2">Términos</a>
                <a href="#" className="text-white d-block">Privacidad</a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <p>&copy; 2025 MoviFlexx.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default HomeBase;
import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const TravelRequest = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    purpose: '',
    budget: '',
    passengers: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Solicitud de viaje enviada:', formData);
    alert('Solicitud de viaje enviada para aprobación');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="travel-request my-4">
      <Card className="border-0 shadow">
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-4">
            Solicitud de Viaje
          </Card.Title>
          
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="origin" className="mb-3">
                  <Form.Label>Origen:</Form.Label>
                  <Form.Control
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    required
                    placeholder="Ciudad de origen"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="destination" className="mb-3">
                  <Form.Label>Destino:</Form.Label>
                  <Form.Control
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    placeholder="Ciudad de destino"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="departureDate" className="mb-3">
                  <Form.Label>Fecha de salida:</Form.Label>
                  <Form.Control
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="returnDate" className="mb-3">
                  <Form.Label>Fecha de regreso:</Form.Label>
                  <Form.Control
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="purpose" className="mb-3">
              <Form.Label>Propósito del viaje:</Form.Label>
              <Form.Select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar propósito</option>
                <option value="business">Negocios</option>
                <option value="vacation">Vacaciones</option>
                <option value="training">Capacitación</option>
                <option value="conference">Conferencia</option>
              </Form.Select>
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="budget" className="mb-3">
                  <Form.Label>Presupuesto estimado:</Form.Label>
                  <Form.Control
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="COP"
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="passengers" className="mb-3">
                  <Form.Label>Número de pasajeros:</Form.Label>
                  <Form.Control
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    min="1"
                    max="10"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Enviar Solicitud de Viaje
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TravelRequest;
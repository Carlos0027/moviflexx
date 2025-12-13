import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Badge, Alert } from 'react-bootstrap';

const SharedTravel = () => {
  const [sharedTrips, setSharedTrips] = useState([
    {
      id: 1,
      driver: 'Jose Martínez',
      origin: 'Popayán',
      destination: 'Cali',
      date: '2024-02-15',
      time: '08:00',
      availableSeats: 4,
      price: 5000,
      vehicle: 'Toyota Corolla'
    },
    {
      id: 2,
      driver: 'Carlos López',
      origin: 'Bogota',
      destination: 'Pasto',
      date: '2024-02-16',
      time: '09:30',
      availableSeats: 2,
      price: 15000,
      vehicle: 'chevrolet spark'
    }
  ]);

  const [newTrip, setNewTrip] = useState({
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: 1,
    price: 0,
    vehicle: ''
  });

  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const trip = {
      id: Date.now(),
      driver: 'Tú',
      ...newTrip,
      availableSeats: newTrip.seats
    };
    setSharedTrips([trip, ...sharedTrips]);
    setNewTrip({ origin: '', destination: '', date: '', time: '', seats: 1, price: 0, vehicle: '' });
    setIsCreating(false);
    setSuccessMessage('¡Viaje publicado exitosamente!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const joinTrip = (tripId) => {
    setSharedTrips(sharedTrips.map(trip => 
      trip.id === tripId 
        ? { ...trip, availableSeats: trip.availableSeats - 1 }
        : trip
    ));
    setSuccessMessage('¡Te has unido al viaje!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Container className="shared-travel my-4">
      <Card className="border-0 shadow">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <Card.Title as="h2" className="mb-0">
                Viaje Compartido
              </Card.Title>
            </Col>
            <Col className="text-end">
              <Button 
                variant={isCreating ? "outline-secondary" : "primary"}
                onClick={() => setIsCreating(!isCreating)}
              >
                {isCreating ? 'Cancelar' : 'Ofrecer Viaje'}
              </Button>
            </Col>
          </Row>

          {successMessage && (
            <Alert variant="success" className="mb-4">
              {successMessage}
            </Alert>
          )}

          {isCreating && (
            <Card className="mb-4 border-0 bg-light">
              <Card.Body>
                <Card.Title as="h4" className="mb-4">
                  Crear Viaje Compartido
                </Card.Title>
                <Form onSubmit={handleCreateTrip}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Origen"
                        value={newTrip.origin}
                        onChange={(e) => setNewTrip({...newTrip, origin: e.target.value})}
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Destino"
                        value={newTrip.destination}
                        onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                        required
                        className="mb-3"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Control
                        type="date"
                        value={newTrip.date}
                        onChange={(e) => setNewTrip({...newTrip, date: e.target.value})}
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="time"
                        value={newTrip.time}
                        onChange={(e) => setNewTrip({...newTrip, time: e.target.value})}
                        required
                        className="mb-3"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        placeholder="Asientos disponibles"
                        value={newTrip.seats}
                        onChange={(e) => setNewTrip({...newTrip, seats: parseInt(e.target.value)})}
                        min="1"
                        max="8"
                        required
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="number"
                        placeholder="Precio por persona ($)"
                        value={newTrip.price}
                        onChange={(e) => setNewTrip({...newTrip, price: parseInt(e.target.value)})}
                        min="0"
                        required
                        className="mb-3"
                      />
                    </Col>
                  </Row>
                  <Form.Control
                    type="text"
                    placeholder="Vehículo"
                    value={newTrip.vehicle}
                    onChange={(e) => setNewTrip({...newTrip, vehicle: e.target.value})}
                    required
                    className="mb-3"
                  />
                  <Button variant="success" type="submit" className="w-100">
                    Publicar Viaje
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          <Card className="border-0">
            <Card.Body>
              <Card.Title as="h4" className="mb-4">
                Viajes Disponibles
              </Card.Title>
              {sharedTrips.map(trip => (
                <Card key={trip.id} className="mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <div className="mb-2">
                          <h5 className="mb-1">
                            {trip.origin} <span className="text-muted">→</span> {trip.destination}
                          </h5>
                          <div className="text-muted small">
                            <span className="me-3">📅 {trip.date}</span>
                            <span className="me-3">⏰ {trip.time}</span>
                            <span className="me-3">👤 {trip.driver}</span>
                            <span>🚗 {trip.vehicle}</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <Badge bg={trip.availableSeats > 0 ? "success" : "danger"} className="me-3">
                            {trip.availableSeats > 0 ? `💺 ${trip.availableSeats} asientos` : 'Completo'}
                          </Badge>
                          <span className="fw-bold">💰 ${trip.price} por persona</span>
                        </div>
                      </Col>
                      <Col md={4} className="text-end">
                        <Button 
                          variant={trip.availableSeats > 0 ? "primary" : "secondary"}
                          onClick={() => joinTrip(trip.id)}
                          disabled={trip.availableSeats === 0}
                          className="w-100"
                        >
                          {trip.availableSeats > 0 ? 'Unirse al Viaje' : 'Completo'}
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SharedTravel;
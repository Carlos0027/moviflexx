import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';

const RouteOptimization = () => {
  const [stops, setStops] = useState(['']);
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addStop = () => {
    setStops([...stops, '']);
  };

  const updateStop = (index, value) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const removeStop = (index) => {
    if (stops.length > 1) {
      const newStops = stops.filter((_, i) => i !== index);
      setStops(newStops);
    }
  };

  const optimizeRoute = () => {
    const filteredStops = stops.filter(stop => stop.trim() !== '');
    if (filteredStops.length < 2) {
      setError('Agrega al menos 2 destinos para optimizar la ruta');
      return;
    }

    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      const optimized = [...filteredStops].sort();
      setOptimizedRoute({
        original: [...filteredStops],
        optimized: optimized,
        distance: (Math.random() * 500 + 100).toFixed(1),
        time: (Math.random() * 6 + 1).toFixed(1),
        savings: (Math.random() * 30 + 10).toFixed(1)
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Container className="route-optimization my-4">
      <Card className="border-0 shadow">
        <Card.Body>
          <Card.Title as="h2" className="text-center mb-4">
            Optimización de Rutas
          </Card.Title>
          
          <Card className="mb-4 border-0 bg-light">
            <Card.Body>
              <Card.Title as="h5" className="mb-3">
                Destinos a visitar:
              </Card.Title>
              
              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}
              
              {stops.map((stop, index) => (
                <div key={index} className="d-flex mb-3 gap-2 align-items-center">
                  <Form.Control
                    type="text"
                    value={stop}
                    onChange={(e) => updateStop(index, e.target.value)}
                    placeholder={`Destino ${index + 1} (ej: Calle6N, #18-20.)`}
                    className="flex-grow-1"
                  />
                  <div className="d-flex gap-2">
                    {stops.length > 1 && (
                      <Button 
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeStop(index)}
                        title="Eliminar destino"
                      >
                        ×
                      </Button>
                    )}
                    {index === stops.length - 1 && (
                      <Button 
                        variant="outline-success"
                        size="sm"
                        onClick={addStop}
                        title="Agregar destino"
                      >
                        +
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Button 
            variant="primary" 
            size="lg" 
            onClick={optimizeRoute} 
            disabled={isLoading}
            className="w-100 mb-4"
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Optimizando...
              </>
            ) : 'Optimizar Ruta'}
          </Button>

          {optimizedRoute && (
            <Card className="border-success border-2">
              <Card.Body>
                <Card.Title as="h4" className="text-success mb-4">
                  Ruta Optimizada Encontrada
                </Card.Title>
                
                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <Card className="border-danger">
                      <Card.Body>
                        <Card.Title className="text-danger">
                          Ruta Original
                        </Card.Title>
                        <p className="mb-0">{optimizedRoute.original.join(' → ')}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-success">
                      <Card.Body>
                        <Card.Title className="text-success">
                          Ruta Optimizada
                        </Card.Title>
                        <p className="mb-0">{optimizedRoute.optimized.join(' → ')}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={4} className="mb-3">
                    <Card className="text-center bg-primary text-white">
                      <Card.Body>
                        <Card.Title>Distancia total</Card.Title>
                        <Card.Text as="h4" className="mb-0">
                          {optimizedRoute.distance} km
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Card className="text-center bg-warning">
                      <Card.Body>
                        <Card.Title>Tiempo estimado</Card.Title>
                        <Card.Text as="h4" className="mb-0">
                          {optimizedRoute.time} horas
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="text-center bg-success text-white">
                      <Card.Body>
                        <Card.Title>Ahorro estimado</Card.Title>
                        <Card.Text as="h4" className="mb-0">
                          {optimizedRoute.savings}%
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RouteOptimization;
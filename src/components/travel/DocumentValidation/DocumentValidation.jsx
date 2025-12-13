import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Spinner, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentValidation = () => {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const respuesta = await fetch("http://localhost:4000/api/documents", {
        method: "GET",
        headers: {"Content-Type":"application/json"},
        credentials: 'include'
      });
      const data = await respuesta.json();
      if (respuesta.ok) {
        setDocuments(data);
      } else {
        setError(data.message || "Error al cargar documentos");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', 'other');
    formData.append('name', file.name);

    try {
      const respuesta = await fetch("http://localhost:4000/api/documents/upload", {
        method: "POST",
        body: formData,
        credentials: 'include'
      });
      const data = await respuesta.json();
      if (respuesta.ok) {
        setDocuments([data.document, ...documents]);
        setError("");
      } else {
        setError(data.message || "Error al subir documento");
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  async function handleValidateDocument(id) {
    try {
      const respuesta = await fetch(`http://localhost:4000/api/documents/${id}/validate`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ status: 'validado' }),
        credentials: 'include'
      });
      if (respuesta.ok) {
        fetchDocuments();
      }
    } catch (err) {
      setError("Error al validar documento");
    }
  }

  async function handleRejectDocument(id, reason) {
    try {
      const respuesta = await fetch(`http://localhost:4000/api/documents/${id}/reject`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ rejectionReason: reason }),
        credentials: 'include'
      });
      if (respuesta.ok) {
        fetchDocuments();
      }
    } catch (err) {
      setError("Error al rechazar documento");
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'validado': return 'success';
      case 'pendiente': return 'warning';
      case 'rechazado': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <Card.Title as="h2" className="mb-0">
                    Validación de Documentación
                  </Card.Title>
                </Col>
                <Col md={4} className="text-end">
                  <Form.Group controlId="formFile">
                    <Form.Label className="btn btn-primary">
                      {uploading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" className="me-2" />
                          Subiendo...
                        </>
                      ) : 'Subir Documento'}
                    </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: 'none' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center border-success">
            <Card.Body>
              <Card.Title>Validados</Card.Title>
              <Card.Text as="h3">
                {documents.filter(doc => doc.status === 'validado').length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-warning">
            <Card.Body>
              <Card.Title>Pendientes</Card.Title>
              <Card.Text as="h3">
                {documents.filter(doc => doc.status === 'pendiente').length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-danger">
            <Card.Body>
              <Card.Title>Rechazados</Card.Title>
              <Card.Text as="h3">
                {documents.filter(doc => doc.status === 'rechazado').length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h3" className="mb-4">Mis Documentos</Card.Title>
              <ListGroup variant="flush">
                {documents.map(doc => (
                  <ListGroup.Item key={doc.id} className="py-3">
                    <Row className="align-items-center">
                      <Col xs={1} className="text-center">
                        {doc.status === 'validado' ? (
                          <span className="text-success fs-5">✓</span>
                        ) : doc.status === 'pendiente' ? (
                          <span className="text-warning fs-5">⏳</span>
                        ) : (
                          <span className="text-danger fs-5">✗</span>
                        )}
                      </Col>
                      <Col xs={6} md={5}>
                        <h5 className="mb-1">{doc.name}</h5>
                        <div className="text-muted small">
                          <div>Subido: {doc.uploadedDate}</div>
                          <div>Vencimiento: {doc.expiryDate}</div>
                          {doc.rejectionReason && (
                            <div className="text-danger">
                              <strong>Motivo:</strong> {doc.rejectionReason}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs={3} md={2} className="text-center">
                        <Badge bg={getStatusVariant(doc.status)} className="p-2">
                          {doc.status.toUpperCase()}
                        </Badge>
                      </Col>
                      <Col xs={2} md={4} className="text-end">
                        {doc.status === 'pendiente' && (
                          <>
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              className="me-2"
                              onClick={() => handleValidateDocument(doc.id)}
                            >
                              Validar
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleRejectDocument(doc.id, "Documento ilegible")}
                            >
                              Rechazar
                            </Button>
                          </>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Documentos Requeridos para Viajar</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span className="text-success me-2">✓</span>
                  Pasaporte o DNI vigente
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-success me-2">✓</span>
                  Licencia de conducir internacional (si aplica)
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-success me-2">✓</span>
                  Seguro de viaje
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-success me-2">✓</span>
                  Visa (para países que lo requieran)
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="text-success me-2">✓</span>
                  Certificado de vacunación
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DocumentValidation;
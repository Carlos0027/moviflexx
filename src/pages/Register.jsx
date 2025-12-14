import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    rol: "PASAJERO"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const campos = [
    { name: "nombre", label: "Nombre Completo", type: "text", placeholder: "Ingresa tu nombre" },
    { name: "email", label: "Correo Electrónico", type: "email", placeholder: "ejemplo@email.com" },
    { name: "telefono", label: "Teléfono (Opcional)", type: "text", placeholder: "Ingresa tu teléfono" },
    { name: "password", label: "Contraseña", type: "password", placeholder: "Crea una contraseña segura" }
  ];

  async function guardar(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
  }

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <Card.Title as="h2" className="text-center mb-4">
                Registrarse
              </Card.Title>

              {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
              {success && <Alert variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}

              <Form onSubmit={guardar}>
                {campos.map((campo) => (
                  <Form.Group className="mb-3" key={campo.name}>
                    <Form.Label>{campo.label}</Form.Label>
                    <Form.Control
                      type={campo.type}
                      placeholder={campo.placeholder}
                      value={form[campo.name]}
                      onChange={(e) => handleChange(campo.name, e.target.value)}
                      required={campo.name !== "telefono"}
                    />
                  </Form.Group>
                ))}

                <Form.Group className="mb-4">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select
                    value={form.rol}
                    onChange={(e) => handleChange("rol", e.target.value)}
                  >
                    <option value="PASAJERO">Pasajero</option>
                    <option value="CONDUCTOR">Conductor</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" size="lg" className="w-100">
                  Registrarse
                </Button>
              </Form>

              <p className="text-center text-muted mt-3">
                ¿Ya tienes cuenta? <a href="/login" className="text-decoration-none">Inicia sesión aquí</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
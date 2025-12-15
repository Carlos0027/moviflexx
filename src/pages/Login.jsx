import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    async function guardar(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const respuesta = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        const data = await respuesta.json();
        console.log(data);

        if (respuesta.ok) {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            if (data.usuario?.nombre) {
                localStorage.setItem('userName', data.usuario.nombre);
            }
            
            setSuccess("¡Login exitoso!");
            navigate("/bienvenido");
        } else {
            setError(data.message || 'Error al iniciar sesión');
        }
    }

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow border-0">
                        <Card.Body className="p-4">
                            <Card.Title as="h2" className="text-center mb-4">
                                Iniciar Sesión
                            </Card.Title>

                            {error && (
                                <Alert variant="danger" onClose={() => setError("")} dismissible>
                                    {error}
                                </Alert>
                            )}
                            {success && (
                                <Alert variant="success" onClose={() => setSuccess("")} dismissible>
                                    {success}
                                </Alert>
                            )}

                            <Form onSubmit={guardar}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="ejemplo@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" size="lg" className="w-100">
                                    Iniciar Sesión
                                </Button>
                            </Form>

                            <p className="text-center text-muted mt-3">
                                ¿No tienes cuenta?{" "}
                                <a href="/register" className="text-decoration-none">
                                    Regístrate aquí
                                </a>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
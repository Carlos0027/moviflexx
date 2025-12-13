import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const respuesta = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });

            const data = await respuesta.json();
            
            if (!respuesta.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // Aquí deberías usar tu AuthContext
            // guardarToken(data.token);
            // guardarnombre(data.usuario.nombre);
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.usuario.nombre);
            
            console.log("Login exitoso:", data.usuario.nombre);
            navigate("/bienvenido");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4}>
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

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-3">
                                <a href="/forgot-password" className="text-decoration-none">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <div className="text-center mt-3">
                                <span>¿No tienes cuenta? </span>
                                <a href="/register" className="text-decoration-none">
                                    Regístrate aquí
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
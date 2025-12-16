import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

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

        const respuesta = await fetch("http://localhost:3000/api/auth/login", {
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
            navigate("/dashboard");
        } else {
            setError(data.message || 'Error al iniciar sesión');
        }
    }

    return (
        <div style={{
            background: 'linear-gradient(20deg, #b425e0ff, #00dfccff, #ecececff)', 
            minHeight: '100vh',
            minWidth: '100vw'}}>
        <Navbar />
            
            <Row className="h-100 justify-content-center align-items-center mt-5">
                <Col xs={12} md={6} lg={4}>
                    <Card className="shadow border-0">
                        <Card.Body className="p-4">
                            <Card.Title as="h2" className="text-center mb-4">
                                Iniciar Sesión
                            </Card.Title>
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
                                        placeholder="Ingrese su contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button style={{background: 'linear-gradient(20deg, #6f42c1, #59c2ffff)'}} type="submit" size="lg" className="w-100">
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
        </div>
    );
}

export default Login;
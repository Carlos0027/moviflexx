import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logo from '../pages/Imagenes/LOGO.jpeg';

export default function NavbarCustom() {
  return (
    <Navbar bg="white" variant="light" expand="lg" className="border-bottom shadow-sm rounded">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} height="40" className="me-2" /> 
          <span className="fw-bold text-primary">MoviFlexx</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-basico" />
        <Navbar.Collapse id="navbar-basico">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" className="fw-bold">
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="btn text-white rounded-pill px-4" style={{ backgroundColor: '#9e61d8ff' }}> Registrarse
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
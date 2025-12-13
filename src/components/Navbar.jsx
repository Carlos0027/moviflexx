import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import "./Navbar.css";

export default function Navigation() {
  return (
    <Navbar expand="lg" className="navbar-custom py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="nav-logo d-flex align-items-center">
          <span className="logo-icon me-2">MF</span>
          MoviFlexx
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Enlaces de navegación */}
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Inicio
            </Nav.Link>
            <Nav.Link href="#features" className="nav-link-custom">
              Features
            </Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">
              Acerca de
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">
              Contacto
            </Nav.Link>
          </Nav>

          {/* Botones de autenticación */}
          <div className="d-flex gap-3">
            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              className="nav-link-login px-4"
            >
              Iniciar Sesión
            </Button>
            <Button
              as={Link}
              to="/register"
              className="nav-btn-register px-4 btn-gradiente"
            >
              Registrarse
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
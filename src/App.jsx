import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bienvenido from "./pages/Bienvenido";
import Dashboard from "./pages/Dashboard";
import SolicitudViaje from "./components/travel/TravelRequest/TravelRequest";
import OptimizacionRutas from "./components/travel/RouteOptimization/RouteOptimization";
import ViajeCompartido from "./components/travel/SharedTravel/SharedTravel";
import ValidacionDocumentos from "./components/travel/DocumentValidation/DocumentValidation";
import SoporteTecnico from "./components/support/TechnicalSupport";
import ReportesAutomaticos from "./components/reports/AutomaticReports";
import ChatInterno from "./components/chat/InternalChat";
import SeguimientoConversaciones from "./components/notifications/ConversationTracker";
import NotificacionesTickets from "./components/notifications/TicketNotifications";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomeBase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bienvenido-pasajero" element={<Bienvenido />} />
        <Route path="/bienvenido-conductor" element={<Bienvenido />} />
        
        {/* Rutas protegidas después del login */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas de módulos específicos */}
        <Route path="/solicitud-viaje" element={<SolicitudViaje />} />
        <Route path="/optimizacion-rutas" element={<OptimizacionRutas />} />
        <Route path="/viaje-compartido" element={<ViajeCompartido />} />
        <Route path="/validacion-documentos" element={<ValidacionDocumentos />} />
        <Route path="/soporte-tecnico" element={<SoporteTecnico />} />
        <Route path="/reportes-automaticos" element={<ReportesAutomaticos />} />
        <Route path="/chat-interno" element={<ChatInterno />} />
        <Route path="/seguimiento-conversaciones" element={<SeguimientoConversaciones />} />
        <Route path="/notificaciones-tickets" element={<NotificacionesTickets />} />
      </Routes>
    </Router>
  );
}

export default App;
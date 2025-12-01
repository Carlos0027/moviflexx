import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bienvenido from "./pages/Bienvenido";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil"; // ← IMPORTAR EL COMPONENTE DE PERFIL
import Admin from "./pages/Admin/Admin";
import AdminConductores from "./pages/Admin/AdminConductores";
import AdminUsuarios from "./pages/Admin/AdminUsuarios";
import AdminVehiculos from "./pages/Admin/AdminVehiculos";
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
      <Routes>
        {/* Rutas de Admin (sin Navbar) */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/conductores" element={<AdminConductores />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/vehiculos" element={<AdminVehiculos />} />

        {/* RUTAS CON NAVBAR */}
        <Route path="/" element={<><Navbar /><HomeBase /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />
        <Route path="/bienvenido" element={<><Navbar /><Bienvenido /></>} />
        <Route path="/bienvenido-pasajero" element={<><Navbar /><Bienvenido /></>} />
        <Route path="/bienvenido-conductor" element={<><Navbar /><Bienvenido /></>} />

        {/* RUTAS SIN NAVBAR (Dashboard & Módulos) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* ← AGREGAR ESTA RUTA DE PERFIL */}
        <Route path="/perfil" element={<Perfil />} />
        
        {/* Otras rutas de módulos */}
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
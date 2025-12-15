import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { statesData } from './data'
import Mapa from "./Map";
import Navbar from "./components/Navbar";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bienvenido from "./pages/Bienvenido";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
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
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeBase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function RequiredAuth({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default App;
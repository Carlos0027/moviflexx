import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Dashboard";
import AdminConductores from "./pages/Admin/AdminConductores";
import AdminUsuarios from "./pages/Admin/AdminUsuarios";
import AdminVehiculos from "./pages/Admin/AdminVehiculos";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Viajes from "./pages/Admin/ViajesAdmin";
import "./App.css";
import RegisterDocumentacion from "./pages/Documents";
import AdminDocuments from "./pages/Admin/AdminDocuments";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeBase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/conductores" element={<AdminConductores />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/vehiculos" element={<AdminVehiculos />} />
          <Route path="/admin/viajes" element={<Viajes/>} />
          <Route path="/documentacion" element={<RegisterDocumentacion />} />
          <Route path="/admin/documentacion" element={<AdminDocuments/>} />
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
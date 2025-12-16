import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Mapa from "./Map";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Admin";
import Admin from "./pages/Admin/Admin";
import AdminConductores from "./pages/Admin/AdminConductores";
import AdminUsuarios from "./pages/Admin/AdminUsuarios";
import AdminVehiculos from "./pages/Admin/AdminVehiculos";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeBase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/conductores" element={<AdminConductores />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/admin/vehiculos" element={<AdminVehiculos />} />
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
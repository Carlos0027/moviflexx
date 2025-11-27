import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bienvenido from "./pages/Bienvenido"
import Admin from "./pages/Admin/Admin";
import AdminConductores from "./pages/Admin/AdminConductores";
import AdminUsuarios from "./pages/Admin/AdminUsuarios";
import AdminVehiculos from "./pages/Admin/AdminVehiculos";
import AdminUsuariosEspera from "./pages/Admin/AdminUsuariosEspera";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/conductores" element={<AdminConductores />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/vehiculos" element={<AdminVehiculos />} />
        <Route path="/admin/espera" element={<AdminUsuariosEspera />} />  
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeBase />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bienvenido" element={<Bienvenido />} />
            </Routes>
          </>
        } />
      </Routes>
  </Router>
  );
}

export default App;
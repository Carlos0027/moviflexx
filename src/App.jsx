import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeBase from "./pages/HomeBase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bienvenido from "./pages/Bienvenido"
import Admin from "./pages/Admin/Admin";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} /> {/* ✅ Sin Navbar */}
        <Route path="/*" element={
          <>
            <Navbar /> {/* ✅ Solo en estas rutas */}
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
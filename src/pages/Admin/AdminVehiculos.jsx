import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from '../Imagenes/Map.png';
import "./AdminConductores.css";

function AdminVehiculos(){
    const [vehiculos, setVehiculos] = useState([]);
    
    useEffect(()=> {
        traerVehiculos();
    }, []);
    
    async function traerVehiculos(){
        await fetch("http://localhost:3000/api/vehiculos",{
            method:"GET",
            headers: {
                "Content-Type":"application/json"
            }
        }).then(response => response.json())
        .then(data => setVehiculos(data));
    }

    async function eliminarVehiculo(id) {
        await fetch(`http://localhost:3000/api/vehiculos/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        traerVehiculos();
    }

    return(
        <div className="admin-conductores-container">
            {/* Navbar */}
            <div className="admin-nav">
                <div className="nav-container">
                    {/* Logo */}
                    <Link to="/admin" className="nav-logo">
                        <span className="logo-icon">MF</span>
                        MoviFlexx
                    </Link>
                    <div className="nav-auth">
                        <Link to="/" className="nav-link-login">
                            Cerrar Sesión
                        </Link>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="conductores-content">
                <h1 className="page-title">Lista de Vehículos</h1>
                
                {/* Tabla con estilos */}
                <div className="table-container">
                    <table className="conductores-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Placa</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>ID Conductor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculos.map((vehiculo) => (
                                <tr key={vehiculo.idVehiculo} className="table-row">
                                    <td className="table-cell">{vehiculo.idVehiculo}</td>
                                    <td className="table-cell">{vehiculo.placa}</td>
                                    <td className="table-cell">{vehiculo.modelo}</td>
                                    <td className="table-cell">{vehiculo.anio}</td>
                                    <td className="table-cell">{vehiculo.conductorId}</td>
                                    <td className="table-cell actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => eliminarVehiculo(vehiculo.idVehiculo)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminVehiculos;
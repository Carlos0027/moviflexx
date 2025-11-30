import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminConductores.css";

function AdminConductores(){
    const [conductores, setConductores] = useState([]);
    
    useEffect(()=> {
        traerConductores();
    }, []);
    
    async function traerConductores(){
        await fetch("http://localhost:3000/api/conductores",{
            method:"GET",
            headers: {
                "Content-Type":"application/json"
            }
        }).then(response => response.json())
        .then(data => setConductores(data));
    }

    async function eliminarConductor(id) {
        await fetch(`http://localhost:3000/api/conductores/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        traerConductores();
    }

    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
                <h1 className="page-title">Lista de Conductores</h1>
                
                {/* Tabla con estilos */}
                <div className="table-container">
                    <table className="conductores-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Licencia</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th>Fecha Contratación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conductores.map((conductor) => (
                                <tr key={conductor.idConductores} className="table-row">
                                    <td className="table-cell">{conductor.idConductores}</td>
                                    <td className="table-cell">{conductor.nombres}</td>
                                    <td className="table-cell">{conductor.apellidos}</td>
                                    <td className="table-cell">{conductor.licencia}</td>
                                    <td className="table-cell">{conductor.telefono}</td>
                                    <td className="table-cell">
                                        <span className={`estado-badge ${conductor.estado.toLowerCase()}`}>
                                            {conductor.estado}
                                        </span>
                                    </td>
                                    <td className="table-cell">{formatearFecha(conductor.fechaContratacion)}</td>
                                    <td className="table-cell actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => eliminarConductor(conductor.idConductores)}
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

export default AdminConductores;
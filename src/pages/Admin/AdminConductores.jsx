import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from '../Imagenes/Map.png';
import "./AdminConductores.css"; // TÚ creas este archivo

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
        }).then(response=> response.json())
        .then(data=> setConductores(data));
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
                        <Link to="/rutas" className="nav-btn-register">
                            <div className="nav-icon">
                                <img src={Map} alt="Mapa" />
                            </div>
                            Ver Rutas
                        </Link>
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
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Archivos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {conductores.map((conductor)=>(
                                <tr key={conductor.id} className="table-row">
                                    <td className="table-cell">{conductor.id}</td>
                                    <td className="table-cell">{conductor.nombre}</td>
                                    <td className="table-cell">{conductor.telefono}</td>
                                    <td className="table-cell">{conductor.archivos}</td>
                                    <td className="table-cell actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => eliminarConductor(conductor.id)}
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
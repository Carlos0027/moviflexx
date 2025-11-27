import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from '../Imagenes/Map.png';
import "./AdminConductores.css"; // MISMO ARCHIVO CSS

function AdminUsuariosEspera(){

    const [usuariosEspera, setUsuariosEspera] = useState([]);
    
    useEffect(()=> {
        traerUsuariosEspera();
    }, []);
    
    async function traerUsuariosEspera(){
        await fetch("http://localhost:3000/api/espera",{
            method:"GET",
            headers: {
                "Content-Type":"application/json"
            }
        }).then(response=> response.json())
        .then(data=> setUsuariosEspera(data));
    }

    async function eliminarUsuarioEspera(id) {
        await fetch(`http://localhost:3000/api/espera/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        traerUsuariosEspera();
    }

    return(
        <div className="admin-conductores-container"> {/* MISMA CLASE */}
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
            <div className="conductores-content"> {/* MISMA CLASE */}
                <h1 className="page-title">Lista de Usuarios en Espera</h1>
                
                {/* Tabla con estilos */}
                <div className="table-container">
                    <table className="conductores-table"> {/* MISMA CLASE */}
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
                            {usuariosEspera.map((usuarioEspera)=>(
                                <tr key={usuarioEspera.id} className="table-row">
                                    <td className="table-cell">{usuarioEspera.id}</td>
                                    <td className="table-cell">{usuarioEspera.nombre}</td>
                                    <td className="table-cell">{usuarioEspera.telefono}</td>
                                    <td className="table-cell">{usuarioEspera.archivos}</td>
                                    <td className="table-cell actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => eliminarUsuarioEspera(usuarioEspera.id)}
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

export default AdminUsuariosEspera;
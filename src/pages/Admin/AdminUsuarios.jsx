import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Map from '../Imagenes/Map.png';
import "./AdminConductores.css"; // MISMO ARCHIVO CSS

function AdminUsuarios(){

    const [usuarios, setUsuarios] = useState([]);
    
    useEffect(()=> {
        traerUsuarios();
    }, []);
    
    async function traerUsuarios(){
        await fetch("http://localhost:3000/api/usuarios",{
            method:"GET",
            headers: {
                "Content-Type":"application/json"
            }
        }).then(response=> response.json())
        .then(data=> setUsuarios(data));
    }

    async function eliminarUsuario(id) {
        await fetch(`http://localhost:3000/api/usuarios/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });
        traerUsuarios();
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
                <h1 className="page-title">Lista de Usuarios</h1>
                
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
                            {usuarios.map((usuario)=>(
                                <tr key={usuario.id} className="table-row">
                                    <td className="table-cell">{usuario.id}</td>
                                    <td className="table-cell">{usuario.nombre}</td>
                                    <td className="table-cell">{usuario.telefono}</td>
                                    <td className="table-cell">{usuario.archivos}</td>
                                    <td className="table-cell actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => eliminarUsuario(usuario.id)}
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

export default AdminUsuarios;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminConductores.css";

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
        }).then(response => response.json())
        .then(data => setUsuarios(data));
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
                <h1 className="page-title">Lista de Usuarios</h1>
                
                {/* Tabla con estilos */}
                <div className="table-container">
                    <table className="conductores-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Usuario</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Rol ID</th>
                                <th>Estado</th>
                                <th>Fecha Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.idUsuariosSistema} className="table-row">
                                    <td className="table-cell">{usuario.idUsuariosSistema}</td>
                                    <td className="table-cell">{usuario.nombreUsuario}</td>
                                    <td className="table-cell">{usuario.nombres}</td>
                                    <td className="table-cell">{usuario.apellidos}</td>
                                    <td className="table-cell">{usuario.correo}</td>
                                    <td className="table-cell">{usuario.rolId}</td>
                                    <td className="table-cell">
                                        <span className={`estado-badge ${usuario.estado.toLowerCase()}`}>
                                            {usuario.estado}
                                        </span>
                                    </td>
                                    <td className="table-cell">{formatearFecha(usuario.fechaRegistro)}</td>
                                    <td className="table-cell actions">
                                        <button 
                                            className="delete-btn"
                                            onClick={() => eliminarUsuario(usuario.idUsuariosSistema)}
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
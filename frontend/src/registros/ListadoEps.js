import axios from "axios";
import React, { useEffect, useState } from "react";
import AgregarEps from "../formularios/AgregarEps";
import { Link, useNavigate } from "react-router-dom";
import { confirmarEliminacion } from "../comunes/Notificaciones";
import { toast } from "react-toastify";

export default function ListadoEps() {
  const urlBase = "http://localhost:8080/sipress-app/epsS";
  const [eps, setEpsS] = useState([]);
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const cargarEpsS = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEpsS(response.data);
      setError(null);
    } catch (error) {
      setError("Error al cargar los registros");
      console.error("Error al cargar los registros:", error);
    }
  };

  useEffect(() => {
    cargarEpsS();
  }, []);

  const eliminarEps = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${urlBase}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cargarEpsS();
      toast.success("Registro eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el registro", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        toast.error("Hubo un error al eliminar el registro");
      }
    }
  };

  // Limitación de funciones de acuerdo con el rol del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/sipress-app/usuarios/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRole(response.data.role);
        console.log("Rol del usuario:", response.data.role);
      })
      .catch((error) => {
        console.error("Error al obtener el rol del usuario", error);
      });
  }, []);

  return (
    <div className="p-3 mb-2 mt-5">
      <section>
        <AgregarEps onEpsAdded={cargarEpsS} />
        {error && <p>Error al cargar los registros: {error.message}</p>}
        <div id="actions" className="mt-3">
          <div className="row justify-content-center">
            <div className="col-12 col-md-4 d-flex justify-content-center">
              <a href="/inicio" className="btn btn-info">
                <i className="fa-solid fa-arrow-left-long"></i> Ir a la página
                de inicio
              </a>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center">
              <Link
                to="#"
                className="btn btn-success"
                data-bs-toggle={
                  role.nombre === "SUPERADMIN" || role.nombre === "ADMIN"
                    ? "modal"
                    : ""
                }
                data-bs-target={
                  role.nombre === "SUPERADMIN" || role.nombre === "ADMIN"
                    ? "#AgregarConsultorioModal"
                    : ""
                }
                onClick={() => {
                  if (role.nombre === "USER") {
                    toast.error(
                      "No tiene los permisos necesarios para agregar un registro."
                    );
                  }
                }}>
                <i className="fa-regular fa-square-plus"></i> Agregar Registro
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="row">
        <div className="col-md-9">
          <div className="card" id="contenedor-lista">
            <div className="card-header">
              <h3 className="text-center">
                <i className="fa-solid fa-staff-snake"></i> Lista de EPS
              </h3>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID EPS</th>
                    <th>Nombre de la EPS</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // Iterar sobre el arreglo de EPS
                    eps.map((eps, indice) => (
                      <tr key={indice}>
                        <th scope="row">{eps.idEps}</th>
                        <td>{eps.nombreEps}</td>
                        <td>{eps.telefonoEps}</td>
                        <td>{eps.emailEps}</td>
                        <td>
                          <div className="textCenter">
                            {(role.nombre === "SUPERADMIN" ||
                              role.nombre === "ADMIN") && (
                              <Link
                                to={`/epsS/editar/${eps.idEps}`}
                                className="btn btn-warning btn-sm me-2">
                                <i className="fa-regular fa-pen-to-square"></i>{" "}
                                Editar
                              </Link>
                            )}
                            {role.nombre === "SUPERADMIN" && (
                              <button
                                onClick={() =>
                                  confirmarEliminacion(eps.idEps, eliminarEps)
                                }
                                className="btn btn-danger btn-sm">
                                <i className="fa-regular fa-trash-can"></i>{" "}
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

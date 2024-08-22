import axios from "axios";
import React, { useEffect, useState } from "react";
import AgregarDoctor from "../formularios/AgregarDoctor";
import { Link, useNavigate } from "react-router-dom";

export default function ListadoDoctores() {
  const urlBase = "http://localhost:8080/sipress-app/doctores";
  const [doctores, setDoctores] = useState([]);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const cargarDoctores = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctores(response.data);
      setError(null); 
    } catch (error) {
      setError("Error al cargar los pacientes");
      console.error("Error al cargar pacientes:", error);
    }
  };

  useEffect(() => {
    cargarDoctores();
  }, []);

  const eliminarDoctor = async (id) => {
    const confirmacion = window.confirm(
      "¿Está seguro de que desea eliminar este registro?"
    );
    if (confirmacion) {
      const token = localStorage.getItem("token"); 
      try {
        await axios.delete(`${urlBase}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        cargarDoctores();
      } catch (error) {
        console.error("Error al eliminar el registro", error);
        // Manejo de errores
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    }
  };

  return (
    <div className="p-3 mb-2 mt-5">
      <section>
        <AgregarDoctor onDoctorAdded={cargarDoctores} />
        {error && <p>Error al cargar registros: {error.message}</p>}
        <div id="actions">
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
                data-bs-toggle="modal"
                data-bs-target="#AgregarDoctorModal">
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
                <i className="fa-solid fa-user-doctor"></i> Lista de doctores
              </h3>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID Doctor</th>
                    <th>Nombre completo</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Dependencia</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // Iterar sobre el arreglo de doctores
                    doctores.map((doctor, indice) => (
                      <tr key={indice}>
                        <th scope="row">{doctor.idDoctor}</th>
                        <td>
                          {doctor.nombreDoctor} {doctor.apellidoDoctor}
                        </td>
                        <td>{doctor.telefonoDoctor}</td>
                        <td>{doctor.emailDoctor}</td>
                        <td>
                          {doctor.dependencia && (
                            <div>
                              {doctor.dependencia.nombreDependencia}
                              <div>
                                Sede:{" "}
                                {doctor.dependencia.institucion && (
                                  <div>
                                    {
                                      doctor.dependencia.institucion
                                        .nombreInstitucion
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="textCenter">
                            <Link
                              to={`/doctores/editar/${doctor.idDoctor}`}
                              className="btn btn-warning btn-sm me-2">
                              <i className="fa-regular fa-pen-to-square"></i>{" "}
                              Editar
                            </Link>
                            <button
                              onClick={() => eliminarDoctor(doctor.idDoctor)}
                              className="btn btn-danger btn-sm">
                              <i className="fa-regular fa-trash-can"></i>{" "}
                              Eliminar
                            </button>
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

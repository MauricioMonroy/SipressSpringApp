import axios from "axios";
import React, { useEffect, useState } from "react";
import AgregarInstitucion from "../formularios/AgregarInstitucion";
import { Link, useNavigate } from "react-router-dom";

export default function ListadoInstituciones() {
  const urlBase = "http://localhost:8080/sipress-app/instituciones";
  const [instituciones, setInstituciones] = useState([]);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const cargarInstituciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstituciones(response.data);
      setError(null); 
    } catch (error) {
      setError("Error al cargar los pacientes");
      console.error("Error al cargar pacientes:", error);
    }
  };

  useEffect(() => {
    cargarInstituciones();
  }, []);

  const eliminarInstitucion = async (id) => {
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
        cargarInstituciones();
      } catch (error) {
        console.error("Error al eliminar la institución", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    }
  };

  return (
    <div className="p-3 mb-2 mt-5">
      <section>
        <AgregarInstitucion onInstitucionAdded={cargarInstituciones} />
        {error && <p>Error al cargar las instituciones: {error.message}</p>}
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
                data-bs-target="#AgregarInstitucionModal">
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
                <i className="fa-regular fa-hospital"></i> Lista de
                instituciones
              </h3>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID Institución</th>
                    <th>Nombre de la Institución</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Código Postal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // Iterar sobre el arreglo de instituciones
                    instituciones.map((institucion, indice) => (
                      <tr key={indice}>
                        <th scope="row">{institucion.idInstitucion}</th>
                        <td>{institucion.nombreInstitucion}</td>
                        <td>{institucion.direccionInstitucion}</td>
                        <td>{institucion.telefonoInstitucion}</td>
                        <td>{institucion.codigoPostal}</td>
                        <td>
                          <div className="textCenter">
                            <Link
                              to={`/instituciones/editar/${institucion.idInstitucion}`}
                              className="btn btn-warning btn-sm me-2">
                              <i className="fa-regular fa-pen-to-square"></i>{" "}
                              Editar
                            </Link>
                            <button
                              onClick={() =>
                                eliminarInstitucion(institucion.idInstitucion)
                              }
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
